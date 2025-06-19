//src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { getMyProfile } from "../services/api"; // ✅ make sure this is defined correctly

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Invalid credentials");
      }

      const { token } = await res.json();
      await login(token); // Sets currentUser

      // ✅ Fetch current user info
      const userRes = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!userRes.ok) {
        throw new Error("Failed to fetch user info");
      }

      const user = await userRes.json();

      // ✅ Show only one success toast
      toast.success("Login successful!");

      if (user.role === "user") {
        navigate("/");
      } else if (user.role === "provider") {
        try {
          const profile = await getMyProfile();
          if (profile) {
            navigate(`/profiles/${profile._id}`);
          } else {
            navigate("/create");
          }
        } catch {
          navigate("/create");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="p-2 border mb-2 block w-full"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="p-2 border mb-2 block w-full"
        />
        <button
          disabled={loading}
          type="submit"
          className="p-2 bg-blue-500 text-gray-100 w-full"
        >
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
}
