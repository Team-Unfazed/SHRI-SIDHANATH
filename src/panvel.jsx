import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PanvelPage from './pages/PanvelPage';
import './styles/tokens.css';
import './styles/base.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PanvelPage />
  </StrictMode>
);
