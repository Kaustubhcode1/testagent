import { axiosInstance } from './axiosInstance';
import { LoginRequest, LoginResponse, LogoutResponse, SessionResponse } from '../types/auth.types';
import { logger } from '../utils/logger';

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      logger.info('Login API call initiated', {
        username: credentials.username,
        timestamp: new Date().toISOString(),
      });

      const response = await axiosInstance.post<LoginResponse>('/api/auth/login', credentials);

      const correlationId = response.headers['x-correlation-id'];
      logger.info('Login successful', {
        correlationId,
        username: credentials.username,
        status: response.status,
      });

      return response.data;
    } catch (error: any) {
      logger.error('Login failed', {
        correlationId: error.correlationId,
        username: credentials.username,
        error: error.message,
      });
      throw error;
    }
  },

  async logout(): Promise<LogoutResponse> {
    try {
      logger.info('Logout API call initiated', {
        timestamp: new Date().toISOString(),
      });

      const response = await axiosInstance.post<LogoutResponse>('/api/auth/logout');

      const correlationId = response.headers['x-correlation-id'];
      logger.info('Logout successful', {
        correlationId,
        status: response.status,
      });

      return response.data;
    } catch (error: any) {
      logger.error('Logout failed', {
        correlationId: error.correlationId,
        error: error.message,
      });
      throw error;
    }
  },

  async validateSession(): Promise<SessionResponse> {
    try {
      logger.info('Session validation API call initiated', {
        timestamp: new Date().toISOString(),
      });

      const response = await axiosInstance.get<SessionResponse>('/api/auth/session');

      const correlationId = response.headers['x-correlation-id'];
      logger.info('Session validation successful', {
        correlationId,
        status: response.status,
      });

      return response.data;
    } catch (error: any) {
      logger.error('Session validation failed', {
        correlationId: error.correlationId,
        error: error.message,
      });
      throw error;
    }
  },
};