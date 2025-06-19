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

  // Extract owner id safely from profile
const profileOwnerId = typeof profile?.owner === "object"
  ? profile.owner._id
  : profile.owner;

// Then check ownership
const isOwner =
  currentUser?.role === "provider" &&
  currentUser?.id === profileOwnerId;


  console.log("CurrentUser:", currentUser);
console.log("Profile owner ID:", profileOwnerId);
console.log("Is owner?", isOwner);


  return (
    <div className="p-4">
      <img src={profile.photo || FALLBACK_PHOTO} alt="profile photo" className="w-32 h-32 object-cover mb-4 rounded-full" />
      <h1 className="text-2xl font-semibold mb-2">{profile.name}</h1>
      <p>Service: {profile.serviceType}</p>
      <p>Location: {profile.area}</p>

      {/* Only show Edit if current user is a provider and owns this profile */}
      {isOwner && (
        <Link
          to={`/profiles/${profile._id}/edit`}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
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
