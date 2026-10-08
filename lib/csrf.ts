'use client';

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function setCookie(name: string, value: string): void {
  if (!isBrowser()) return;
  document.cookie = `${name}=${value}; Path=/; SameSite=Strict`;
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
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Strict`;
}

export const csrf = {
  getToken(): string {
    let token = getCookie(CSRF_COOKIE_NAME);
    if (!token) {
      token = generateToken();
      setCookie(CSRF_COOKIE_NAME, token);
    }
    return token;
  },

  getHeader(): Record<string, string> {
    return { [CSRF_HEADER_NAME]: this.getToken() };
  },

  validateToken(token: string): boolean {
    const stored = getCookie(CSRF_COOKIE_NAME);
    return stored === token && stored !== null;
  },

  refreshToken(): string {
    const token = generateToken();
    setCookie(CSRF_COOKIE_NAME, token);
    return token;
  },

  clearToken(): void {
    deleteCookie(CSRF_COOKIE_NAME);
  },
};

export { CSRF_COOKIE_NAME, CSRF_HEADER_NAME };