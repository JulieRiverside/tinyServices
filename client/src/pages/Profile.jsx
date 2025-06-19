// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProfile } from "../services/api";
import { useAuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

export default function Profile() {
  const { id } = useParams();
  const { currentUser } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const FALLBACK_PHOTO = "/fallback.jpg";

  useEffect(() => {
    async function loadProfile(){
      setLoading(true);
      try {
        const data = await fetchProfile(id);
        setProfile(data);
        toast.success("Profile loaded successfully!");
        setError(null);
      } catch (err) {
        setError(err);
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 p-4">{error?.message || "Error loading profile"}</p>;
  if (!profile) return <p className="p-4">Profile not found</p>;

  const isOwner = currentUser?.id === profile?.owner; // assuming `profile` has a `user` field with owner's id
  console.log("Current user:", currentUser);
  console.log("Profile:", profile);

  return (
    <div className="p-4">
      <img src={profile.photo || FALLBACK_PHOTO} alt="profile photo" className="w-32 h-32 object-cover mb-4 rounded-full" />
      <h1 className="text-2xl font-semibold mb-2">{profile.name}</h1>
      <p>Service: {profile.serviceType}</p>
      <p>Location: {profile.area}</p>

      {/* If the current user owns this profile, show the edit button */}
      {currentUser?.role === "provider" && currentUser?.id === profile?.user && (
  <Link to={`/profiles/${profile._id}/edit`} className="bg-blue-500 text-white p-2 mt-4 rounded inline-block">
    Edit Profile
  </Link>
)}


      <a
        href={`https://wa.me/${profile.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="text-green-500 underline mt-4 block"
      >
        Contact on WhatsApp
      </a>
    </div>
  )
}
