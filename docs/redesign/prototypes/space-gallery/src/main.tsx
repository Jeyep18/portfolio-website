import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

const root = document.getElementById('root')!;
const page = root.dataset.page || (location.pathname === '/' ? 'index.html' : location.pathname.slice(1));
if (root.querySelector('header')) hydrateRoot(root, <App page={page} />);
else createRoot(root).render(<App page={page} />);
