import { NextRequest, NextResponse } from 'next/server';

const MOCK_USER = {
  id: 'usr_demo',
  name: 'Mariana Costa',
  email: 'demo@evereste.com',
  initials: 'MC',
  createdAt: '2024-01-15T10:30:00.000Z',
  updatedAt: '2024-01-15T10:30:00.000Z',
};

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const accessToken = request.cookies.get('access_token')?.value;

  if (!authHeader && !accessToken) {
    return NextResponse.json(
      { message: 'Não autenticado' },
      { status: 401 }
    );
  }

  return NextResponse.json(MOCK_USER);
}