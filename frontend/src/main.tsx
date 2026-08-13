 import { StrictMode } from 'react';
 import { createRoot } from 'react-dom/client';
 import App from './App';
 import { logger } from './utils/logger';

 logger.info('Application initialization', {
   timestamp: new Date().toISOString(),
   mode: import.meta.env.MODE,
 });

 const rootElement = document.getElementById('root');

 if (!rootElement) {
   logger.error('Fatal error: root element not found');
   throw new Error('Root element not found');
 }

 try {
   createRoot(rootElement).render(
     <StrictMode>
       <App />
     </StrictMode>
   );
 } catch (error: any) {
   logger.error('Fatal error during initial render', {
     error: error.message,
   });
   throw error;
 }  