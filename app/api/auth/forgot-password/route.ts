import { NextRequest, NextResponse } from 'next/server';
import { withCsrfProtection } from '@/lib/api-validation';

async function handler(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: 'E-mail é obrigatório' },
        { status: 400 }
      );
    }

    if (email === 'erro@exemplo.com') {
      return NextResponse.json(
        { message: 'Não encontramos uma conta com este e-mail.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'E-mail de recuperação enviado com sucesso.' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export const POST = withCsrfProtection(handler);