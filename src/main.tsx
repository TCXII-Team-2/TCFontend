import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

// Role-based dashboards
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardAgent from "./pages/agent/DashboardAgent";
import DashboardClient from "./pages/client/DashboardClient";

import ProtectedRoute from "./components/ProtectedRoute"; // your wrapper
import { ROLES } from "./types/roleUser";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />, // main dashboard page
        children: [
          {
            path: "admin",
            element: <DashboardAdmin />,
          },
          {
            path: "agent",
            element: <DashboardAgent />,
          },
          {
            path: "client",
            element: <DashboardClient />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
