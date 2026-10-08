import { NextRequest, NextResponse } from 'next/server';
import { withCsrfProtection } from '@/lib/api-validation';

const MOCK_TOKENS = {
  accessToken: 'mock-access-token-' + Date.now(),
  refreshToken: 'mock-refresh-token-' + Date.now(),
  expiresIn: 3600,
};

interface CreateAuthResponseUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  createdAt: string;
  updatedAt: string;
}

function createAuthResponse(user: CreateAuthResponseUser) {
  return {
    user,
    ...MOCK_TOKENS,
  };
}

async function handler(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword } = body;

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: 'As senhas não coincidem.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'A senha deve ter pelo menos 6 caracteres.' },
        { status: 400 }
      );
    }

    const initials = name.split(' ').map((p: string) => p[0]).join('').slice(0, 2).toUpperCase();

    return NextResponse.json(
      createAuthResponse({
        id: 'usr_001',
        name,
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