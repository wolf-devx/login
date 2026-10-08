import { NextRequest, NextResponse } from 'next/server';
import { withCsrfProtection } from '@/lib/api-validation';

async function handler(request: NextRequest) {
  return NextResponse.json({ message: 'Logout realizado com sucesso' });
}

export const POST = withCsrfProtection(handler);