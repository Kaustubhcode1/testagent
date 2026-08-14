import { useEffect, useRef } from 'react';
import { ErrorEnvelope } from '../types/auth.types';
import { logger } from '../utils/logger';

interface ErrorBannerProps {
  error: ErrorEnvelope | null;
  onDismiss?: () => void;
}

export const ErrorBanner = ({ error, onDismiss }: ErrorBannerProps) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      logger.error('Error banner displayed', {
        correlationId: error.correlationId,
        message: error.message,
        status: error.status,
      });

      if (bannerRef.current) {
        bannerRef.current.focus();
      }
    }
  }, [error]);

  const handleDismiss = () => {
    logger.info('Error banner dismissed', {
      correlationId: error?.correlationId,
    });

    if (onDismiss) {
      onDismiss();
    }
  };

  if (!error) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      tabIndex={-1}
      style={{
        padding: '16px',
        marginBottom: '16px',
        backgroundColor: '#fee',
        border: '1px solid #c33',
        borderRadius: '4px',
        color: '#c33',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>Error:</strong> {error.message}
          {error.correlationId && (
            <div style={{ fontSize: '0.875rem', marginTop: '4px' }}>
              Correlation ID: {error.correlationId}
            </div>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={handleDismiss}
            aria-label="Dismiss error"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#c33',
              padding: '0 8px',
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
