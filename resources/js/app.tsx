import ReactDOM from 'react-dom/client';
import React from 'react';
import Main from "./Main";

const rootElement = document.getElementById('app') as HTMLElement;
if (!rootElement) {
  throw new Error('Could not find root element');
}

ReactDOM.createRoot(rootElement).render(
  <Main />
);