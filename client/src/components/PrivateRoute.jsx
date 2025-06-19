// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function PrivateRoute() {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />; // ⬅️ This renders the nested route (like CreateProfile)
}
