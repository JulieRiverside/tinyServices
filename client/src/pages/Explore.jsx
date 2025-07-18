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
    <div className="w-screen min-h-screen bg-gray-50 px-4 py-8 w-full">
      {/* Search input */}
      <div className="w-full mb-8">
        <input
          type="text"
          placeholder="Search by service, area, or name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Explore Services
      </h1>

      {/* Profiles Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 w-full">
        {filtered.length > 0 ? (
          filtered.map((profile) => (
            <Link
              to={`/profiles/${profile._id}`}
              key={profile._id}
              className="block bg-white p-4 rounded-xl shadow hover:shadow-md transition border border-gray-200"
            >
              <img
                src={profile.photo || "/fallback.jpg"}
                alt={profile.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
              <p className="text-gray-700">Service: {profile.serviceType}</p>
              <p className="text-gray-700">Location: {profile.area}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  window.open(`https://wa.me/${profile.whatsapp}`, "_blank");
                }}
                className="text-green-600 underline mt-2 block text-sm"
              >
                Contact on WhatsApp
              </button>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No profiles match your search.</p>
        )}
      </div>
    </div>
  );
}

