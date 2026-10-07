import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// Normalize mixed path and hash routing (e.g. /courses#/voice-coach -> /#/voice-coach)
(function normalizeRouting() {
  if (typeof window === 'undefined') return;
  const { pathname, hash, search } = window.location;
  const isGhPages = pathname.startsWith('/Fitness-Intelligence');
  const basePath = isGhPages ? '/Fitness-Intelligence/' : '/';
  const rawSubPath = isGhPages ? pathname.slice('/Fitness-Intelligence'.length) : pathname;

  if (rawSubPath && rawSubPath !== '/' && rawSubPath !== '') {
    const cleanSubPath = rawSubPath.replace(/^\/+/, '');
    // If a hash route already exists (e.g. /courses#/voice-coach), prioritize the destination hash
    const targetHash = hash && hash.startsWith('#/') ? hash : `#/${cleanSubPath}`;
    window.history.replaceState(null, '', `${basePath}${targetHash}${search}`);
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
