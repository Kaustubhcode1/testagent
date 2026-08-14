import { axiosInstance } from './axiosInstance';
import { LoginRequest, LoginResponse, LogoutResponse, SessionResponse } from '../types/auth.types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/api/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<LogoutResponse> => {
    const response = await axiosInstance.post<LogoutResponse>('/api/auth/logout');
    return response.data;
  },

  getSession: async (): Promise<SessionResponse> => {
    const response = await axiosInstance.get<SessionResponse>('/api/auth/session');
    return response.data;
  },
};