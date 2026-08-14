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
    const correlationId = uuidv4();
    config.headers.set('X-Correlation-ID', correlationId);
    logger.debug(`Outgoing request: ${config.method?.toUpperCase()} ${config.url}`, {
      correlationId,
      url: config.url,
      method: config.method,
    });
    return config;
  },
  (error: AxiosError) => {
    logger.error('Request interceptor error', { message: error.message });
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const correlationId = response.config.headers?.['X-Correlation-ID'] as string | undefined;
    logger.debug(`Incoming response: ${response.status} ${response.config.url}`, {
      correlationId,
      status: response.status,
    });
    return response;
  },
  (error: AxiosError<ErrorEnvelope>) => {
    const correlationId = error.config?.headers?.['X-Correlation-ID'] as string | undefined;
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';

    logger.error(`API Error: ${status} - ${message}`, {
      correlationId,
      status,
      url: error.config?.url,
    });

    return Promise.reject({
      message,
      status,
      correlationId,
    } as ErrorEnvelope);
  }
);