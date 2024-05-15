import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import Rounds from "./pages/Rounds.jsx";
import App from "./App.jsx";
import NewRound from "./pages/NewRound.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Handicap from "./pages/Handicap.jsx";

import "./index.css";

const PrivateRoutes = () => {
  const loggedIn = localStorage.getItem('loggedIn')
  return(
      loggedIn ? <Outlet/> : <Navigate to="/login"/>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/rounds",
            element: <Rounds />,
          },
          {
            path: "/handicap",
            element: <Handicap />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
