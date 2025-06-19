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
        console.log("Fetched profile in Navbar:", profile); // ✅ Add this
        if (profile?._id) {
          setMyProfileId(profile._id);
        }
      } catch (err) {
        console.log("Error fetching my profile:", err);
      }
    } 
  }

  fetchProfile();
}, [currentUser]);


  return (
    <nav className="flex justify-between items-center px-4 py-2 shadow bg-white">
      <Link to="/" className="text-xl font-bold">TinyServices</Link>

      <div className="flex gap-4 items-center">
        <Link to="/explore" className="text-blue-500">Explore</Link>

        {currentUser?.role === "provider" && myProfileId && (
          <Link to={`/profiles/${myProfileId}`} className="text-green-600 font-semibold">
            My Profile
          </Link>
        )}

        {currentUser ? (
          <>
            <span className="text-sm">{currentUser.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
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
