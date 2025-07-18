import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/explore?search=${encodeURIComponent(search)}`);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full text-center flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Find Local Services in Your Area
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8">
          TinyServices helps you connect with local providers — plumbers, henna artists, tutors, and more.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex w-full gap-2 mb-8 px-2">
          <input
            type="text"
            placeholder="Search by service or area"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/explore"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition text-center"
          >
            Explore Now
          </Link>

          {!currentUser && (
            <Link
              to="/register"
              className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition text-center"
            >
              Create a Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
