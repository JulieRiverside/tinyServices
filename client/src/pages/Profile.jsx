// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProfile } from "../services/api";

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProfile(){
      try {
        const data = await fetchProfile(username);
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    loadProfile();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!profile) return <p>Profile not found</p>;
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">{profile.name}</h1>
      <p>Service: {profile.serviceType}</p>
      <p>Location: {profile.area}</p>
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
