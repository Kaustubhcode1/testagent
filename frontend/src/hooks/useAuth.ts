
import { useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/authApi';
import { User, LoginRequest, ErrorEnvelope } from '../types/auth.types';
import { logger } from '../utils/logger';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: ErrorEnvelope | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorEnvelope | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const checkSession = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await authApi.getSession();
      setUser(data.user);
      logger.info('Session validated successfully', { userId: data.user.id });
    } catch (err: any) {
      setUser(null);
      logger.info('No active session found');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await authApi.login(credentials);
      setUser(data.user);
      logger.info('User logged in successfully', { userId: data.user.id });
      return true;
    } catch (err: any) {
      const errorEnvelope: ErrorEnvelope = {
        message: err.message || 'Login failed. Please check your credentials.',
        status: err.status,
        correlationId: err.correlationId,
      };
      setError(errorEnvelope);
      logger.warn('Login attempt failed', { error: errorEnvelope });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authApi.logout();
      setUser(null);
      setError(null);
      logger.info('User logged out successfully');
    } catch (err: any) {
      logger.error('Logout error', { error: err });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    clearError,
  };
};
