import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuthContext();

  return currentUser ? children : <Navigate to="/login" />;
}
