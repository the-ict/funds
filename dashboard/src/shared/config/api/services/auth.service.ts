import apiClient from '../client';
import { ENDP_AUTH_LOGIN, ENDP_AUTH_VERIFY } from '../URLs';
import type { LoginRequest, VerifyRequest, AuthResponse } from '../types';

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(ENDP_AUTH_LOGIN, data);
    return response.data;
  },

  verify: async (data: VerifyRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(ENDP_AUTH_VERIFY, data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  }
};
