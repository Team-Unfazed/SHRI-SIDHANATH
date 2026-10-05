import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import NaviMumbaiPage from './pages/NaviMumbaiPage';
import './styles/tokens.css';
import './styles/base.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NaviMumbaiPage />
  </StrictMode>
);
