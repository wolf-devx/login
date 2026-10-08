'use client';

const COOKIE_OPTIONS = 'Secure; SameSite=Strict; Path=/';
const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function setCookie(name: string, value: string, maxAgeSeconds: number): void {
  if (!isBrowser()) return;
  document.cookie = `${name}=${value}; Max-Age=${maxAgeSeconds}; ${COOKIE_OPTIONS}`;
}

function getCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) return cookieValue;
  }
  return null;
}

function deleteCookie(name: string): void {
  if (!isBrowser()) return;
  document.cookie = `${name}=; Max-Age=0; ${COOKIE_OPTIONS}`;
}

export const secureStorage = {
  getAccessToken(): string | null {
    return getCookie(ACCESS_TOKEN_COOKIE);
  },

  setAccessToken(token: string, expiresIn: number): void {
    setCookie(ACCESS_TOKEN_COOKIE, token, expiresIn);
  },

  getRefreshToken(): string | null {
    return getCookie(REFRESH_TOKEN_COOKIE);
  },

  setRefreshToken(token: string, expiresIn: number): void {
    setCookie(REFRESH_TOKEN_COOKIE, token, expiresIn);
  },

  clearTokens(): void {
    deleteCookie(ACCESS_TOKEN_COOKIE);
    deleteCookie(REFRESH_TOKEN_COOKIE);
  },

  hasTokens(): boolean {
    return !!this.getAccessToken() && !!this.getRefreshToken();
  },
};

export { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE };