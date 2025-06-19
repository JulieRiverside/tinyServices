//src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Retrieve and validate existing token on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(`${import.meta.env.VITE_API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(async res => {
          if (res.ok) {
            const user = await res.json();
            setCurrentUser({ ...user, id: user._id });
          }else {
          const text = await res.text();
          console.error("Failed to fetch user:", text);
        }
        })
        .catch(err => console.error(err)); 
    }
  }, []);

  // Define a login function to reuse after logging in
  const login = async (token) => {
    localStorage.setItem("token", token);
    // fetch current user immediately after obtaining a new token
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const user = await res.json();
      setCurrentUser({ ...user, id: user._id });
    }else {
    const text = await res.text();
    console.error("Login token fetch failed:", text);
  }
  };

  // Define a logout function
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext(){
  return useContext(AuthContext);
}
