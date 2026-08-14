import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { logger } from '../utils/logger';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    logger.warn('Protected route access denied - redirecting to login', {
      attemptedRoute: location.pathname,
      reason: 'not authenticated',
    });

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  logger.info('Protected route access granted', {
    route: location.pathname,
  });

  return <>{children}</>;
};
