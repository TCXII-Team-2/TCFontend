// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: string[];
}) {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Logged in but wrong role
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white rounded-lg p-8 w-full max-w-sm text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page.
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return children; // Correct role, allow access
}
