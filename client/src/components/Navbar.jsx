import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyProfile } from "../services/api";

export default function Navbar() {
  const { currentUser, logout } = useAuthContext();
  const navigate = useNavigate();
  const [myProfileId, setMyProfileId] = useState(null);

  function handleLogout() {
    logout();
    navigate("/");
  }

  useEffect(() => {
    async function fetchProfile() {
      if (currentUser?.role === "provider") {
        try {
          const profile = await getMyProfile();
          if (profile?._id) setMyProfileId(profile._id);
        } catch (err) {
          console.log("Error fetching profile:", err);
        }
      }
    }

    fetchProfile();
  }, [currentUser]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        TinyServices
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link to="/explore" className="text-gray-700 hover:text-blue-600">
          Explore
        </Link>

        {currentUser?.role === "provider" && myProfileId && (
          <Link
            to={`/profiles/${myProfileId}`}
            className="text-green-600 font-medium hover:underline"
          >
            My Profile
          </Link>
        )}

        {currentUser ? (
          <>
            <span className="text-gray-500 hidden sm:inline">{currentUser.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-500 font-medium hover:underline">
              Login
            </Link>
            <Link
              to="/register"
              className="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
