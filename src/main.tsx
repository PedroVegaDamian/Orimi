import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index.tsx';

const root = ReactDOM.createRoot(document.getElementById('root')!); // Asegúrate de que el elemento 'root' existe en tu HTML.

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
