'use client';

import {
  LoginCredentials,
  RegisterData,
  ForgotPasswordData,
  ResetPasswordData,
  AuthResponse,
  User,
  ChangePasswordData,
  UpdateProfileData,
} from './auth';
import { secureStorage } from './secure-storage';
import { csrf } from './csrf';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string,
  isRetry = false
): Promise<T> {
  const method = options.method?.toUpperCase() || 'GET';
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  if (MUTATING_METHODS.has(method)) {
    Object.assign(headers, csrf.getHeader());
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status === 401 && !isRetry && token) {
    try {
      await authApi.refreshToken();
      const newToken = getAccessToken();
      if (newToken) {
        return request(endpoint, options, newToken, true);
      }
    } catch {
      clearTokens();
      throw new ApiError('Sessão expirada. Faça login novamente.', 401, 'SESSION_EXPIRED');
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(error.message || `Erro: ${response.status}`, response.status, error.code);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

function getAccessToken(): string | null {
  return secureStorage.getAccessToken();
}

function setTokens(access: string, refresh: string, expiresIn: number): void {
  secureStorage.setAccessToken(access, expiresIn);
  secureStorage.setRefreshToken(refresh, expiresIn * 24 * 7);
}

function clearTokens(): void {
  secureStorage.clearTokens();
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const data = await request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    setTokens(data.accessToken, data.refreshToken, data.expiresIn);
    return data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setTokens(response.accessToken, response.refreshToken, response.expiresIn);
    return response;
  },

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    return request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    return request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async refreshToken(): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    const refreshToken = secureStorage.getRefreshToken();
    if (!refreshToken) throw new ApiError('Refresh token não disponível', 401);

    const data = await request<{ accessToken: string; refreshToken: string; expiresIn: number }>(
      '/auth/refresh',
      { method: 'POST', body: JSON.stringify({ refreshToken }) }
    );
    setTokens(data.accessToken, data.refreshToken, data.expiresIn);
    return data;
  },

  async getMe(): Promise<User | null> {
    const token = getAccessToken();
    if (!token) return null;

    try {
      return await request<User>('/auth/me', { method: 'GET' }, token);
    } catch {
      return null;
    }
  },

  async logout(): Promise<void> {
    const token = getAccessToken();
    await request('/auth/logout', { method: 'POST' }, token || undefined);
    clearTokens();
  },

  async updateProfile(data: UpdateProfileData): Promise<User> {
    const token = getAccessToken();
    if (!token) throw new ApiError('Não autenticado', 401);

    return request<User>('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }, token);
  },

  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    const token = getAccessToken();
    if (!token) throw new ApiError('Não autenticado', 401);

    return request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }, token);
  },
};

export { getAccessToken, setTokens, clearTokens };