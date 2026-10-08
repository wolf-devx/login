import { NextRequest, NextResponse } from 'next/server';

const CSRF_HEADER_NAME = 'x-csrf-token';
const CSRF_COOKIE_NAME = 'csrf_token';

export function validateCsrfToken(request: NextRequest): boolean {
  const headerToken = request.headers.get(CSRF_HEADER_NAME);
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;

  if (!headerToken || !cookieToken) {
    return false;
  }

  return headerToken === cookieToken;
}

export function createCsrfResponse(): NextResponse {
  const response = NextResponse.json(
    { message: 'Token CSRF inválido ou ausente' },
    { status: 403 }
  );
  return response;
}

export function withCsrfProtection(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    if (!validateCsrfToken(request)) {
      return createCsrfResponse();
    }
    return handler(request);
  };
}

export function getCsrfTokenFromRequest(request: NextRequest): string | null {
  return request.headers.get(CSRF_HEADER_NAME) || request.cookies.get(CSRF_COOKIE_NAME)?.value || null;
}

export function setCsrfCookie(response: NextResponse, token: string): NextResponse {
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}