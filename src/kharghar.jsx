import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import KhargharPage from './pages/KhargharPage';
import './styles/tokens.css';
import './styles/base.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KhargharPage />
  </StrictMode>
);
