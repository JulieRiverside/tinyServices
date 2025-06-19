import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useAuthContext();
  const navigate = useNavigate();

  function handleLogout() {
    logout();         // clear user + token
    navigate("/");    // go to home page
  }

  return (
    <nav className="flex justify-between items-center px-4 py-2 shadow bg-white">
      <Link to="/" className="text-xl font-bold">TinyServices</Link>

      <div className="flex gap-4 items-center">
        {currentUser ? (
          <>
            <span>{currentUser.email}</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-500">Login</Link>
            <Link to="/register" className="text-blue-500">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
