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
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Find Local Services in Your Area
      </h1>
      <p className="text-gray-600 max-w-xl mb-6">
        TinyServices helps you connect with local providers — plumbers, henna artists, tutors, and more.
      </p>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-lg gap-2 mb-6"
      >
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
      <div className="flex gap-4">
        <Link
          to="/explore"
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Explore Now
        </Link>

        {!currentUser && (
          <Link
            to="/register"
            className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition"
          >
            Create a Profile
          </Link>
        )}
      </div>
    </div>
  );
}
