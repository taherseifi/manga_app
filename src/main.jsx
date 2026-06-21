import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './context/ThemeContext.jsx'

import App         from './App.jsx'
import HomePage    from './pages/HomePage.jsx'
import SearchPage  from './pages/SearchPage.jsx'
import DetailPage  from './pages/DetailPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

import { homeLoader, searchLoader, detailLoader } from './services/loaders.js'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: 'search',
        element: <SearchPage />,
        loader: searchLoader,
      },
      {
        path: 'manga/:id',
        element: <DetailPage />,
        loader: detailLoader,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
