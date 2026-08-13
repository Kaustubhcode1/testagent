import { useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/authApi';
import { User, LoginRequest, ErrorEnvelope } from '../types/auth.types';
import { logger } from '../utils/logger';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: ErrorEnvelope | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorEnvelope | null>(null);

  const checkSession = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      logger.info('Session check initiated');

      const response = await authApi.validateSession();
      setUser(response.user);

      logger.info('Session check successful', {
        correlationId: (error as any)?.correlationId,
        username: response.user.username,
      });
    } catch (err: any) {
      setUser(null);
      setError(err);

      logger.warn('Session check failed', {
        correlationId: err.correlationId,
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);

      logger.info('Login initiated', {
        username: credentials.username,
      });

      const response = await authApi.login(credentials);
      setUser(response.user);

      logger.info('Login state updated', {
        correlationId: (error as any)?.correlationId,
        username: response.user.username,
      });
    } catch (err: any) {
      setError(err);

      logger.error('Login error in useAuth', {
        correlationId: err.correlationId,
        username: credentials.username,
        error: err.message,
      });

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      logger.info('Logout initiated', {
        username: user?.username,
      });

      await authApi.logout();
      setUser(null);

      logger.info('Logout state updated', {
        correlationId: (error as any)?.correlationId,
      });
    } catch (err: any) {
      setError(err);

      logger.error('Logout error in useAuth', {
        correlationId: err.correlationId,
        error: err.message,
      });

      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
    checkSession,
  };
};
