import { API_BASE_URL } from '../config';

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

const TIMEOUT_MS = 20000;

export function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  return fetch(url, { ...init, signal: controller.signal }).finally(() =>
    clearTimeout(timer),
  );
}

async function readError(res: Response, fallback: string): Promise<ApiError> {
  const data = await res.json().catch(() => ({}));
  return new ApiError(
    fallback,
    res.status,
    typeof data?.error === 'string' ? data.error : undefined,
  );
}

export async function postJson<T>(
  path: string,
  body: unknown,
  fallback: string,
  method: 'POST' | 'PATCH' = 'POST',
): Promise<T> {
  let res: Response;
  try {
    res = await fetchWithTimeout(`${API_BASE_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError(fallback, 0);
  }
  if (!res.ok) throw await readError(res, fallback);
  return (await res.json().catch(() => ({}))) as T;
}

export async function getJson<T>(path: string, fallback: string): Promise<T> {
  let res: Response;
  try {
    res = await fetchWithTimeout(`${API_BASE_URL}${path}`);
  } catch {
    throw new ApiError(fallback, 0);
  }
  if (!res.ok) throw await readError(res, fallback);
  return (await res.json().catch(() => ({}))) as T;
}
