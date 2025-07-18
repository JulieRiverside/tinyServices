//src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { getMyProfile } from "../services/api";


export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    role: "provider", // default role can be "provider" or "user"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { login } = useAuthContext();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Register first
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(await res.text());

      // Then, login immediately
      const loginRes = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (!loginRes.ok) throw new Error(await loginRes.text());

      const { token } = await loginRes.json();

      await login(token);
      toast.success("Registration successful!");


      // Fetch user to get their role
      const userRes = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
      });
      const user = await userRes.json();

      if (user.role === "user") {
        navigate("/"); // Normal user → go home
      } else if (user.role === "provider") {
        const profile = await getMyProfile();
        if (profile) {
          navigate(`/profiles/${profile._id}`); // redirect to their profile
        } else {
          navigate("/create"); // profile doesn't exist
        }
      }
    } catch (err) {
      toast.error(err?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Register</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="provider">Service Provider</option>
            <option value="user">User</option>
          </select>
          <button
            disabled={loading}
            type="submit"
            className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            {loading ? "Registering…" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
