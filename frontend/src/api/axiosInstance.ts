import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';
import { ErrorEnvelope } from '../types/auth.types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let correlationId = config.headers['X-Correlation-ID'] as string;

    if (!correlationId) {
      correlationId = uuidv4();
      config.headers['X-Correlation-ID'] = correlationId;
      logger.info('Generated client-side correlation ID', { correlationId });
    }

    logger.info('API request initiated', {
      correlationId,
      method: config.method?.toUpperCase(),
      endpoint: config.url,
      timestamp: new Date().toISOString(),
    });

    return config;
  },
  (error) => {
    logger.error('Request interceptor error', { error: error.message });
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const correlationId = response.headers['x-correlation-id'] || response.config.headers['X-Correlation-ID'];

    logger.info('API response received', {
      correlationId,
      status: response.status,
      endpoint: response.config.url,
    });

    return response;
  },
  (error: AxiosError<ErrorEnvelope>) => {
    const correlationId = 
      error.response?.headers['x-correlation-id'] || 
      error.config?.headers?.['X-Correlation-ID'] as string;

    const errorEnvelope: ErrorEnvelope = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status,
      correlationId,
    };

    logger.error('API error intercepted', {
      correlationId,
      status: error.response?.status,
      endpoint: error.config?.url,
      message: errorEnvelope.message,
    });

    if (error.response?.status === 401) {
      logger.warn('401 Unauthorized - redirecting to login', {
        correlationId,
        endpoint: error.config?.url,
        reason: 'session expired or invalid',
      });
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      logger.warn('403 Forbidden - authorization error', {
        correlationId,
        endpoint: error.config?.url,
        reason: 'insufficient permissions',
      });
    }

    return Promise.reject(errorEnvelope);
  }
);
