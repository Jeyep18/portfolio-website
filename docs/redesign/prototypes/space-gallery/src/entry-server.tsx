import { renderToString } from 'react-dom/server';
import { App } from './App';

export function render(page: string) {
  return renderToString(<App page={page} />);
}
