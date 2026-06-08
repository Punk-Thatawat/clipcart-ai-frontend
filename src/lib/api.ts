import { AuthResult } from "@/types/api";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "https://localhost:5120";

const accessTokenKey = "clipcart-access-token";
const refreshTokenKey = "clipcart-refresh-token";
const authEvent = "clipcart-auth-updated";

export class ApiError extends Error {
  constructor(
    message: string,
    public status = 0,
    public details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function getAccessToken() {
  return typeof window === "undefined"
    ? null
    : window.localStorage.getItem(accessTokenKey);
}

export function getRefreshToken() {
  return typeof window === "undefined"
    ? null
    : window.localStorage.getItem(refreshTokenKey);
}

export function storeAuth(auth: AuthResult) {
  window.localStorage.setItem(accessTokenKey, auth.accessToken);
  window.localStorage.setItem(refreshTokenKey, auth.refreshToken);
  window.dispatchEvent(new Event(authEvent));
}

export function clearAuth() {
  window.localStorage.removeItem(accessTokenKey);
  window.localStorage.removeItem(refreshTokenKey);
  window.dispatchEvent(new Event(authEvent));
}

export function subscribeToAuth(callback: () => void) {
  window.addEventListener(authEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(authEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function errorMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== "object") return fallback;
  const data = payload as {
    title?: string;
    detail?: string;
    message?: string;
    errors?: Record<string, string[]>;
  };
  const validation = data.errors ? Object.values(data.errors).flat()[0] : undefined;
  return validation ?? data.detail ?? data.message ?? data.title ?? fallback;
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T;
  const contentType = response.headers.get("content-type") ?? "";
  return contentType.includes("application/json")
    ? response.json()
    : ((await response.text()) as T);
}

async function refreshSession() {
  const refreshToken = getRefreshToken();
  const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(refreshToken ? { refreshToken } : {}),
  });
  if (!response.ok) return false;
  storeAuth(await response.json() as AuthResult);
  return true;
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  retry = true,
): Promise<T> {
  const token = getAccessToken();
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  if (init.signal) {
    if (init.signal.aborted) controller.abort();
    else init.signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers,
      credentials: "include",
      signal: controller.signal,
    });
  } catch (error) {
    throw new ApiError(
      controller.signal.aborted
        ? "The ClipCart API request timed out."
        : "Cannot connect to the ClipCart API. Make sure the backend is running.",
      0,
      error,
    );
  } finally {
    window.clearTimeout(timeout);
  }

  if (response.status === 401 && retry && await refreshSession()) {
    return apiFetch<T>(path, init, false);
  }

  if (!response.ok) {
    let payload: unknown;
    try {
      payload = await parseResponse<unknown>(response);
    } catch {
      payload = undefined;
    }
    throw new ApiError(
      errorMessage(payload, `Request failed (${response.status})`),
      response.status,
      payload,
    );
  }

  return parseResponse<T>(response);
}

export function googleLoginUrl() {
  return `${API_URL}/api/auth/google/login`;
}
