import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RaigadPage from './pages/RaigadPage';
import './styles/tokens.css';
import './styles/base.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RaigadPage />
  </StrictMode>
);
