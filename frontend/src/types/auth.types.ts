export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
}

export interface SessionResponse {
  user: User;
}

export interface ErrorEnvelope {
  message: string;
  status?: number;
  correlationId?: string;
}