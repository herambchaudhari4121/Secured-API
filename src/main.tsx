import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent flash of unstyled content during theme initialization
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

if (shouldUseDark) {
  document.documentElement.classList.add('dark');
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
}

// Add no-transition class temporarily to prevent transitions on page load
document.documentElement.classList.add('no-transition');

// Remove no-transition class after a brief delay
setTimeout(() => {
  document.documentElement.classList.remove('no-transition');
}, 100);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
