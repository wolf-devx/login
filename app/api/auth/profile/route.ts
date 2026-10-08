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

async function handler(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return NextResponse.json(
      { message: 'Não autenticado' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { name, email } = body;

    const updatedUser = {
      ...MOCK_USER,
      name: name || MOCK_USER.name,
      email: email || MOCK_USER.email,
      initials: (name || MOCK_USER.name).split(' ').map((p: string) => p[0]).join('').slice(0, 2).toUpperCase(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedUser);
  } catch {
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export const PATCH = withCsrfProtection(handler);