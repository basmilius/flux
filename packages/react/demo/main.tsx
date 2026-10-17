import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Demo } from './Demo';
import '../dist/index.css';
import './showcase.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Demo />
    </StrictMode>
);
