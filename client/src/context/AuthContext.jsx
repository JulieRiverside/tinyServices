import { createContext, useContext, useState, useEffect } from "react";

// 1. Prepare context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Here you should set `currentUser` based on your auth (JWT, API, etc.)
  // For now, let's hardcode it:
  const [currentUser, setCurrentUser] = useState({ id: "12345" });

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext);
}
