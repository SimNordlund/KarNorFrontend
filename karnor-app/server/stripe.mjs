import { createHmac, timingSafeEqual } from 'node:crypto';
import { config } from './config.mjs';
import { fail, readStore, updateStore } from './store.mjs';

export async function stripeRequest(path, body, idempotencyKey) {
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${config.stripeKey}`,
      ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
      ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
    },
    body: body?.toString(), signal: AbortSignal.timeout(20000),
  });
  const result = await response.json();
  if (!response.ok) fail(502, 'Betaltjänsten kunde inte nås. Försök igen om en stund.');
  return result;
}

export function verifyWebhook(raw, header = '') {
  const parts = header.split(',').map(part => part.split('='));
  const timestamp = parts.find(([key]) => key === 't')?.[1];
  if (!timestamp || !Number.isFinite(Number(timestamp)) || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) fail(400, 'Ogiltig Stripe-signatur.');
  const expected = createHmac('sha256', config.webhookSecret).update(`${timestamp}.`).update(raw).digest();
  const valid = parts.filter(([key]) => key === 'v1').some(([, signature]) => {
    const actual = Buffer.from(signature || '', 'hex');
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  });
  if (!valid) fail(400, 'Ogiltig Stripe-signatur.');
  return JSON.parse(raw.toString('utf8'));
}

export async function recordPayment(session) {
  const id = session.metadata?.orderId;
  if (!id || !readStore().orders[id]) return;
  await updateStore(state => {
    const order = state.orders[id];
    if (order.sessionId && order.sessionId !== session.id) fail(400, 'Sessionen hör inte till beställningen.');
    if (session.amount_total !== order.amount || session.currency !== 'sek') fail(400, 'Betalningsbeloppet stämmer inte.');
    order.sessionId = session.id;
    if (session.payment_status === 'paid' && session.status === 'complete' && order.status !== 'paid') {
      order.status = 'paid';
      order.paidAt = new Date().toISOString();
    }
  });
}
