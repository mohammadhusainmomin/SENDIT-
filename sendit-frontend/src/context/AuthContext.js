import { createContext, useContext, useEffect, useState } from "react";
import { updateCachedToken } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    updateCachedToken(null);
  };

  useEffect(() => {
    const handleSessionExpired = () => {
      setUser(null);
      updateCachedToken(null);
    };

    window.addEventListener("sendit:session-expired", handleSessionExpired);
    return () => window.removeEventListener("sendit:session-expired", handleSessionExpired);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
