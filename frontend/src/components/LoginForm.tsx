import { useState, FormEvent } from 'react';
import { LoginRequest, ErrorEnvelope } from '../types/auth.types';
import { ErrorBanner } from './ErrorBanner';
import { logger } from '../utils/logger';

interface LoginFormProps {
  onSubmit: (credentials: LoginRequest) => Promise<void>;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorEnvelope | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ username?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const errors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      errors.username = 'Username is required';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      logger.warn('Form validation failed', {
        fields: Object.keys(errors),
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (loading) {
      logger.warn('Form submission prevented - already loading');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      logger.info('Form submission attempt', {
        username,
      });

      await onSubmit({ username, password });

      logger.info('Form submission successful', {
        username,
      });
    } catch (err: any) {
      setError(err);

      logger.error('Form submission error', {
        correlationId: err.correlationId,
        username,
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <ErrorBanner error={error} onDismiss={() => setError(null)} />

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '8px' }}>
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          aria-required="true"
          aria-invalid={!!validationErrors.username}
          aria-describedby={validationErrors.username ? 'username-error' : undefined}
          style={{
            width: '100%',
            padding: '8px',
            border: validationErrors.username ? '2px solid #c33' : '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        {validationErrors.username && (
          <div id="username-error" role="alert" style={{ color: '#c33', fontSize: '0.875rem', marginTop: '4px' }}>
            {validationErrors.username}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          aria-required="true"
          aria-invalid={!!validationErrors.password}
          aria-describedby={validationErrors.password ? 'password-error' : undefined}
          style={{
            width: '100%',
            padding: '8px',
            border: validationErrors.password ? '2px solid #c33' : '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        {validationErrors.password && (
          <div id="password-error" role="alert" style={{ color: '#c33', fontSize: '0.875rem', marginTop: '4px' }}>
            {validationErrors.password}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
        }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};