import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MetaMaskContextProvider } from './hooks/useMetamask.tsx';

// import Root from './routes/root';
import App from './App.tsx';
import './index.css';
import Records from './pages/Records.tsx';
import Policy from './pages/Policy.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'policy/:policyId',
    element: <Policy />,
  },
  {
    path: '/Records',
    element: <Records />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MetaMaskContextProvider>
      <RouterProvider router={router} />
    </MetaMaskContextProvider>
  </React.StrictMode>
);
