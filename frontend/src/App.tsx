 import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
 import { Component, ErrorInfo, ReactNode } from 'react';
 import { LoginPage } from './pages/LoginPage';
 import { ProtectedRoute } from './components/ProtectedRoute';
 import { logger } from './utils/logger';

 interface ErrorBoundaryProps {
   children: ReactNode;
 }

 interface ErrorBoundaryState {
   hasError: boolean;
   error: Error | null;
 }

 class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
   constructor(props: ErrorBoundaryProps) {
     super(props);
     this.state = { hasError: false, error: null };
   }

   static getDerivedStateFromError(error: Error): ErrorBoundaryState {
     return { hasError: true, error };
   }

   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
     logger.error('Uncaught error in error boundary', {
       error: error.message,
       componentStack: errorInfo.componentStack,
     });
   }

   render() {
     if (this.state.hasError) {
       return (
         <div style={{ padding: '32px', textAlign: 'center' }}>
           <h1>Something went wrong</h1>
           <p>{this.state.error?.message}</p>
         </div>
       );
     }

     return this.props.children;
   }
 }

 const RouteLogger = () => {
   const location = useLocation();

   logger.info('Route changed', {
     pathname: location.pathname,
   });

   return null;
 };

 const DashboardPlaceholder = () => {
   return (
     <div style={{ padding: '32px' }}>
       <h1>Dashboard</h1>
       <p>Protected dashboard content - role-based routing to be defined</p>
     </div>
   );
 };

 function App() {
   return (
     <ErrorBoundary>
       <BrowserRouter>
         <RouteLogger />
         <Routes>
           <Route path="/login" element={<LoginPage />} />
           <Route
             path="/dashboard"
             element={
               <ProtectedRoute>
                 <DashboardPlaceholder />
               </ProtectedRoute>
             }
           />
           <Route path="/" element={<Navigate to="/dashboard" replace />} />
           <Route path="*" element={<Navigate to="/dashboard" replace />} />
         </Routes>
       </BrowserRouter>
     </ErrorBoundary>
   );
 }

 export default App;  