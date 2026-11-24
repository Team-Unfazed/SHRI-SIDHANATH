import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import NewPanvelPage from './pages/NewPanvelPage';
import './styles/tokens.css';
import './styles/base.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NewPanvelPage />
  </StrictMode>
);
