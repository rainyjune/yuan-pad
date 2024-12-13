import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from './common/Fallback';
import './css/index.css';

import App from './App';

createRoot(document.getElementById('content') as Element).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
