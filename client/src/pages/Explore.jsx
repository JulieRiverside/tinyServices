import { useEffect, useState } from "react";
import { fetchProfiles } from "../services/api";

export default function Explore() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function loadProfiles(){
      try {
        const data = await fetchProfiles();
        setProfiles(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadProfiles();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Explore Services</h1>
      {profiles.length > 0 ? (
        <ul className="space-y-2">
          {profiles.map(profile => (
            <li key={profile._id} className="p-4 border rounded shadow">
              <a
                className="text-blue-500 font-semibold"
                href={`/u/${profile.username}`}
              >
                {profile.name} - {profile.serviceType}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading profiles...</p>
      )}

    </div>
  )
}
