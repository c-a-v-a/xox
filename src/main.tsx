import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';
import TitleScreen from './routes/TitleScreen.tsx';
import Error from './routes/Error.tsx';
import Settings from './routes/Settings.tsx';
import TwoPlayers from './routes/TwoPlayers.tsx';
import SinglePlayer from './routes/SinglePlayer.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TitleScreen />,
    errorElement: <Error />
  },
  {
    path: '/settings',
    element: <Settings />
  },
  {
    path: '/two_players',
    element: <TwoPlayers />
  },
  {
    path: '/singleplayer',
    element: <SinglePlayer />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
