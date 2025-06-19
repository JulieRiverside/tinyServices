//src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const { token } = await res.json();

        await login(token);
        toast.success("Login successful!");
        navigate("/profile"); // Redirect to profile
      } else {
        toast.error("Invalid credentials.");
      }
    } catch (err) {
      toast.error("Login failed.");
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
  )
}
