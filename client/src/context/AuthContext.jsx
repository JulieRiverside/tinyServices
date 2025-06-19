// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user from token
  const fetchUserFromToken = async (token) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Failed to fetch user:", text);
        return null;
      }

      const user = await res.json();

      if (!user || !user._id) {
        console.error("⚠️ User data is null or missing _id");
        return null;
      }

      return { ...user, id: user._id }; // normalize
    } catch (err) {
      console.error("🚨 Error fetching user from token:", err);
      return null;
    }
  };

  // On refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserFromToken(token).then((user) => {
        if (user) setCurrentUser(user);
        else logout();
      });
    }
  }, []);

  // Login logic
  const login = async (token) => {
    localStorage.setItem("token", token);
    const user = await fetchUserFromToken(token);
    if (user) {
      setCurrentUser(user);
    } else {
      logout();
      console.error("⚠️ Login failed to fetch user profile");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
