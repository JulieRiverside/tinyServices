// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProfile } from "../services/api";
import { useAuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

export default function Profile() {
  const { username } = useParams();
  const { currentUser } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const FALLBACK_PHOTO = "/fallback.jpg";

  useEffect(() => {
    async function loadProfile(){
      setLoading(true);
      try {
        const data = await fetchProfile(username);
        setProfile(data);
        toast.success("Profile loaded successfully!");
        setError(null);
      } catch (err) {
        setError(err);
        toast.error("Failed to load profile.");
      }finally{
        setLoading(false);
      }
    }
    loadProfile();
  }, [username]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 p-4">{error.message}</p>;
  if (!profile) return <p className="p-4">Profile not found</p>;

  const isOwner = currentUser?.id === profile._id;
  
  
  return (
    <div className="p-4">
      <img src={profile.photo || FALLBACK_PHOTO} alt="profile photo" className="w-32 h-32 object-cover mb-4 rounded-full"/>
      <h1 className="text-2xl font-semibold mb-2">{profile.name}</h1>
      <p>Service: {profile.serviceType}</p>
      <p>Location: {profile.area}</p>

      {/* If the current user owns this profile, show the edit button */}
      {isOwner && (
        <Link to={`/profiles/${profile._id}/edit`} className="bg-blue-500 text-gray-100 p-2 mt-4 block w-fit">
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
