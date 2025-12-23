import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[]; // ["admin"], ["agent"], ["client"], etc.
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  // Récupère l'utilisateur depuis localStorage ou contexte
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  // Si pas connecté → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Si rôle non autorisé → redirect home
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  // Sinon → render children (via Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
