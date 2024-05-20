import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from './common/Fallback';
import ACPBox from './Dashboard';

createRoot(document.getElementById('content') as Element).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <ACPBox />
    </ErrorBoundary>
  </StrictMode>,
);
