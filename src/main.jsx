import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import UserAuthContextProvider from './context/UserAuthContext';
import routes from './routes/Routes';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthContextProvider>
      <RouterProvider router={routes} />
    </UserAuthContextProvider>
  </StrictMode>
);
