import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import KamothePage from './pages/KamothePage';
import './styles/tokens.css';
import './styles/base.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KamothePage />
  </StrictMode>
);
