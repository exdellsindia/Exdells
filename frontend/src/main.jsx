// Entry point for Exdells Website React SPA
// This file mounts the main App component and sets up the router.

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';

// Set up React Router for SPA navigation
const router = createBrowserRouter(
  [
    { path: '/', element: <App /> },
    // Catch-all route: ensures deep links render App (which contains <Routes>)
    { path: '*', element: <App /> }
  ],
  { future: { v7_startTransition: true } }
);

// Mount the app to the root DOM node
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
