import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchProfiles } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Explore() {
  const [profiles, setProfiles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search"); // initial search from Home, if any

  const [searchTerm, setSearchTerm] = useState(search || ""); // control search with state

  useEffect(() => {
    async function loadProfiles() {
      try {
        const data = await fetchProfiles();
        setProfiles(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadProfiles();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="p-4 text-red-500">{error?.message}</p>;

  // Filter by searchTerm
  const filtered = profiles.filter(
    (profile) =>
      profile.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <div className="p-4">
      {/* Search input for quick search */}
      <div className="p-4 shadow-md rounded mb-6">
        <input
          type="text"
          placeholder="Search by service, area, or name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full border rounded"
        />
      </div>

      <h1 className="text-2xl font-semibold mb-4">
        Explore Services
      </h1>

      <div className="grid gap-4">
        {filtered.length > 0 ? (
          filtered.map((profile) => (
            <Link to={`/profiles/${profile._id}`} key={profile._id}>
              <div className="p-4 border rounded-md">
                <img src={profile.photo || "/fallback.jpg"} alt="" className="w-32 h-32 object-cover mb-4" />
                <h2 className="text-lg font-semibold">{profile.name}</h2>
                <p>Service: {profile.serviceType}</p>
                <p>Location: {profile.area}</p>
                {/* Instead of a nested <a>, we can show a button or a separate icon */}
                <button
                   onClick={(e) => {
                     e.stopPropagation();
                     e.preventDefault();
                     window.open(`https://wa.me/${profile.whatsapp}`, '_blank');
                   }}
                   className="text-green-500 underline mt-2 block"
                 >
                   Contact on WhatsApp
                 </button>
              </div>
            </Link>
          ))
        ) : (
          <p>No profiles match your search</p>
        )}

      </div>
    </div>
  )
}

