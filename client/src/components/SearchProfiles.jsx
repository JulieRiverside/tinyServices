//src/components/SearchProfiles.jsx

import { useState, useEffect } from "react";

function SearchProfiles() {
  const [profiles, setProfiles] = useState([]);

  const [area, setArea] = useState('');
  const [service, setService] = useState('');

  async function handleSearch(e) {
    e.preventDefault();

    let url = "https://tinyservices.onrender.com/api/profiles";
    const params = [];

    if (area) params.push(`area=${encodeURIComponent(area)}`);
    if (service) params.push(`service=${encodeURIComponent(service)}`);

    if (params.length) {
      url += "?" + params.join("&");
    }
    console.log('Fetching from!', url);
    const res = await fetch(url);
    const data = await res.json();

    setProfiles(data);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          placeholder="Search by service" 
          value={service} 
          onChange={(e) => setService(e.target.value)} 
        />
        <input 
          placeholder="Search by area" 
          value={area} 
          onChange={(e) => setArea(e.target.value)} 
        />
        <button type="submit">
          Search
        </button>
      </form>

      <ul>
        {profiles?.map((p) => (
          <li key={p._id}>
            {p.name} — {p.serviceType} in {p.area}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchProfiles;
