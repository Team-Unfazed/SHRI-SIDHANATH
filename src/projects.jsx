import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ProjectsPage from './pages/ProjectsPage';
import './styles/tokens.css';
import './styles/base.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectsPage />
  </StrictMode>
);
