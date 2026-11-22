import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import KalamboliPage from './pages/KalamboliPage';
import './styles/tokens.css';
import './styles/base.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KalamboliPage />
  </StrictMode>
);
