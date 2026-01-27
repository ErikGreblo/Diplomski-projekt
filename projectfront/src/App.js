import Home from './components/Home';
import Datoteke from './components/Datoteke';
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

function App() {
  const [messages, setMessages] = useState([]);

  const router = createBrowserRouter([
    {
      path: "*",
      element: <Navigate to="/home" replace />,
    },
    {
      path: "/home",
      element: <Home messages={messages} setMessages={setMessages}/>
    },
    {
      path: "/pregled-datoteka",
      element: <Datoteke />
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
