let csrf = '';
export const setCsrf = (value: string) => { csrf = value; };

const backendUrl = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');

// Keep frontend assets on this site; only backend paths use the API origin.
export function apiUrl(path: string): string {
  return /^\/(?:api\/|media\/|downloadPdf(?:\/|ByFileName\/))/.test(path)
    ? `${backendUrl}${path}`
    : path;
}

export function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  return fetch(apiUrl(path), { ...options, credentials: 'include', cache: 'no-store' });
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await apiFetch(path, {
    ...options,
    headers: {
      ...(typeof options.body === 'string' ? { 'Content-Type': 'application/json' } : {}),
      ...(csrf ? { 'X-CSRF-Token': csrf } : {}), ...options.headers,
    },
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result) throw new Error(result?.message || 'Servern kunde inte nås. Försök igen om en stund.');
  return result as T;
}
