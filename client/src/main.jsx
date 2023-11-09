import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices/root.js'
import Root from './routes/Root.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import Dashboard from './routes/Dashboard.jsx'
import Fridge from './routes/Fridge.jsx'
import FridgeSettings from './routes/FridgeSettings.jsx'

export const API_URL = 'http://localhost:3001'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "fridge/:id",
        element: <Fridge />,
      },
      {
        path: "fridge/:id/settings",
        element: <FridgeSettings />,
      },
    ],
  },
]);

const store = configureStore({ reducer: rootReducer })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
