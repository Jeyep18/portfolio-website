import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

const page = location.pathname.split('/').pop() || 'index.html';
const root = document.getElementById('root')!;
if (root.querySelector('header')) hydrateRoot(root, <App page={page} />);
else createRoot(root).render(<App page={page} />);
