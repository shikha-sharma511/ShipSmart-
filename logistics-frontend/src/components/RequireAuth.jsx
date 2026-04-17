import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAuth = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect user to their own dashboard if unauthorized
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "seller") return <Navigate to="/seller" replace />;
    return <Navigate to="/buyer" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
