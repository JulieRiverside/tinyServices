import { useEffect, useState } from "react";
import { fetchProfiles } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchProfiles from "../components/SearchProfiles";

export default function Explore() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadProfiles(){
      try {
        const data = await fetchProfiles();
        setProfiles(data);
      } catch (err) {
        setError(err);
      } finally{
        setLoading(false);
      }
    }
    loadProfiles();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="p-4 text-red-500">{error?.message}</p>;

  // Filter by searchTerm
  const filtered = profiles.filter(profile =>
    profile.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <div className="p-4">
      <div className="p-4 shadow-md rounded mb-6">
        <SearchProfiles />
      </div>

      <h1 className="text-2xl font-semibold mb-4">Explore Services</h1>
      <div className="grid gap-4">
        {filtered.length > 0 ? (
          filtered.map((profile) => (
            <div key={profile._id} className="p-4 border rounded-md">
              <img src={profile.photo || "/fallback.jpg"} alt="" className="w-32 h-32 object-cover mb-4" />
              <h2 className="text-lg font-semibold">{profile.name}</h2>
              <p>Service: {profile.serviceType}</p>
              <p>Location: {profile.area}</p>
              <a
                className="text-green-500 underline mt-2 block"
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                Contact on WhatsApp
              </a>
            </div>
          ))
        ) : (
          <p>No profiles match your search</p>
        )}

      </div>
    </div>
  )
}
