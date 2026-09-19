let csrf = '';
export const setCsrf = (value: string) => { csrf = value; };

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...options, credentials: 'same-origin', cache: 'no-store',
    headers: {
      ...(typeof options.body === 'string' ? { 'Content-Type': 'application/json' } : {}),
      ...(csrf ? { 'X-CSRF-Token': csrf } : {}), ...options.headers,
    },
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result) throw new Error(result?.message || 'Servern kunde inte nås. Försök igen om en stund.');
  return result as T;
}
