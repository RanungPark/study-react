import React from 'react';
import Home from './screens/Home';
import About from './screens/About';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'about',
          element:<About />
        }
      ]
    }
  ])

export default router