import { NextRequest, NextResponse } from 'next/server';
import { withCsrfProtection } from '@/lib/api-validation';

async function handler(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json(
        { message: 'Refresh token não disponível' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      expiresIn: 3600,
    });
  } catch {
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export const POST = withCsrfProtection(handler);