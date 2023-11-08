import React from 'react';
import Home from './screens/Home';
import About from './screens/About';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import NotFound from './screens/NotFound';
import ErrorComponent from './components/ErrorComponent';
import User from './users/User'
import Followers from './users/Followers';

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <Home />,
          errorElement: <ErrorComponent />
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'users/:userId',
          element: <User />,
          children: [
            {
              path: 'followers',
              element: <Followers />
            }
          ]
        }
      ],
      errorElement: <NotFound />
    }
  ])

export default router