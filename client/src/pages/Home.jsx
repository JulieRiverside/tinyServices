import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      // Redirect to explore with search as a query parameter
      navigate(`/explore?search=${encodeURIComponent(search)}`);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold mb-4">
        Find Local Services in Your Area
      </h1>
      <p className="mb-6">
        TinyServices lets you find and connect with local service providers effortlessly. Whether you need a plumber, a henna artist, or a fitness instructor, we've got you covered.
      </p>

      {/* Quick search form */}
      <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Search by service or area"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-gray-50 font-semibold rounded"
        >
          Search
        </button>
      </form>
      
      <Link
        to="/explore"
        className="px-4 py-2 bg-blue-500 text-gray-50 font-semibold rounded">
        Explore Now
      </Link>

      {/* Call to Action Section */}
      <div className="mt-6 p-4 border rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-2">
          Are you a service provider?
        </h2>
        <p className="mb-4">
          Join TinyServices today and connect with more people in your area.
        </p>
        <Link
          to="/create"
          className="px-4 py-2 bg-green-500 text-gray-50 font-semibold rounded">
          Create Your Profile
        </Link>
      </div>

    </div>
  )
}
