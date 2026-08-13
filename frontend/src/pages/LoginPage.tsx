 import { useNavigate, useLocation } from 'react-router-dom';
 import { LoginForm } from '../components/LoginForm';
 import { useAuth } from '../hooks/useAuth';
 import { LoginRequest } from '../types/auth.types';
 import { logger } from '../utils/logger';

 export const LoginPage = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const { login } = useAuth();

   const handleLogin = async (credentials: LoginRequest) => {
     try {
       await login(credentials);

       const from = (location.state as any)?.from?.pathname || '/dashboard';

       logger.info('Login successful - navigating', {
         username: credentials.username,
         targetRoute: from,
       });

       navigate(from, { replace: true });
     } catch (error: any) {
       logger.error('Login navigation error', {
         correlationId: error.correlationId,
         username: credentials.username,
         error: error.message,
       });

       throw error;
     }
   };

   return (
     <div style={{ padding: '32px', maxWidth: '500px', margin: '0 auto' }}>
       <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>Login</h1>
       <LoginForm onSubmit={handleLogin} />
     </div>
   );
 };  