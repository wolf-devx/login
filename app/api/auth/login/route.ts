import { NextRequest, NextResponse } from 'next/server';
import { withCsrfProtection } from '@/lib/api-validation';

const MOCK_USER = {
  id: 'usr_demo',
  name: 'Mariana Costa',
  email: 'demo@evereste.com',
  initials: 'MC',
  createdAt: '2024-01-15T10:30:00.000Z',
  updatedAt: '2024-01-15T10:30:00.000Z',
};

const MOCK_TOKENS = {
  accessToken: 'mock-access-token-' + Date.now(),
  refreshToken: 'mock-refresh-token-' + Date.now(),
  expiresIn: 3600,
};

function createAuthResponse(user = MOCK_USER) {
  return {
    user,
    ...MOCK_TOKENS,
  };
}

async function handler(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'E-mail e senha são obrigatórios' },
        { status: 400 }
      );
    }

    if (email === 'demo@evereste.com' && password === '123456') {
      return NextResponse.json(createAuthResponse());
    }

    if (email === 'erro@exemplo.com' || password.length < 6) {
      return NextResponse.json(
        { message: 'E-mail ou senha inválidos. Tente novamente.' },
        { status: 401 }
      );
    }

    const name = email.split('@')[0].replace(/[._-]/g, ' ');
    const initials = name.split(' ').map((p: string) => p[0]).join('').slice(0, 2).toUpperCase();

    return NextResponse.json(
      createAuthResponse({
        id: 'usr_001',
        name: name.replace(/\b\w/g, (l: string) => l.toUpperCase()),
        email,
        initials,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    );
  } catch {
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export const POST = withCsrfProtection(handler);