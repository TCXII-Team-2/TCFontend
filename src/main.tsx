import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import AdminLayout from "./layouts/AdminLayout";
import AgentLayout from "./layouts/AgentLayout";
import ClientLayout from "./layouts/ClientLayout";

import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardAgent from "./pages/agent/DashboardAgent";
import DashboardClient from "./pages/client/DashboardClient";

import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ path: "dashboard", element: <DashboardAdmin /> }],
  },

  {
    path: "/agent",
    element: <AgentLayout />,
    children: [{ path: "dashboard", element: <DashboardAgent /> }],
  },

  {
    path: "/client",
    element: <ClientLayout />,
    children: [{ path: "dashboard", element: <DashboardClient /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
