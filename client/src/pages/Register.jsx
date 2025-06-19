//src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

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

      if (user.role === "provider") {
      // Check if profile exists
      const profileRes = await fetch(`${import.meta.env.VITE_API_BASE}/api/profiles/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (profileRes.ok) {
        const profile = await profileRes.json();
        navigate(`/profiles/${profile._id}`); // ✅ redirect to existing profile
      } else {
        navigate("/create"); // ❌ no profile yet
      }
      } else {
          navigate("/"); // regular user
      } 
    } catch (err) {
      setError(err?.message || "Registration failed.");
      toast.error(err?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="p-2 border block w-full"
        />
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="p-2 border block w-full"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="p-2 border block w-full"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="p-2 border block w-full"
        >
          <option value="provider">Service Provider</option>
          <option value="user">User</option>
        </select>
        <button
          disabled={loading}
          type="submit"
          className="p-2 bg-green-500 text-white w-full"
        >
          {loading ? "Registering…" : "Register"}
        </button>
      </form>
    </div>
  );
}
