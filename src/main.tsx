import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n'; // i18n foundation (item 35) - initializes on load

// Sentry skeleton (item 34) - optional, enabled via VITE_SENTRY_DSN
if (import.meta.env.VITE_SENTRY_DSN) {
  // import * as Sentry from '@sentry/react';
  // Sentry.init({
  //   dsn: import.meta.env.VITE_SENTRY_DSN,
  //   tracesSampleRate: 0.1,
  // });
  console.log('Sentry would initialize here if DSN provided');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
