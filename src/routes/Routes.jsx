import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import Login from '../components/auth/Login';
import SignUp from './../components/auth/SignUp';
import ResetPassword from '../components/auth/ResetPassword';
import AddCarPage from '../pages/AddCarPage';
import PrivateRoute from './PrivateRoute';
import MyCarPage from '../pages/MyCarPage';
import AllAvailableCars from '../pages/AllAvailableCars';
import CarDetailsPage from '../pages/CarDetailsPage';
import MyBookingPage from '../pages/MyBookingPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,

    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'available-cars',
        element: <AllAvailableCars />,
      },
      {
        path: 'car-details/:id',
        element: <CarDetailsPage />,
      },
      {
        path: 'add-car',
        element: (
          <PrivateRoute>
            <AddCarPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-cars',
        element: (
          <PrivateRoute>
            <MyCarPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-bookings',
        element: (
          <PrivateRoute>
            <MyBookingPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <SignUp />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
    ],
  },
]);

export default routes;
