import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ShowcasePage from './pages/ShowcasePage';

createRoot(document.getElementById('root')).render(<StrictMode><ShowcasePage /></StrictMode>);
