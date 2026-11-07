import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("vti_admin_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Flowchart: Start: Open Portal -> Enter Admin Credentials -> Authenticated?
    await new Promise((resolve) => setTimeout(resolve, 600));

    const u = username.trim().toLowerCase();
    if ((u === "admin" || u === "admin@vti.edu") && password === "admin123") {
      const userData = {
        username: "admin",
        name: "System Administrator",
        email: "admin@vti.edu",
        role: "System Administrator",
        accessLevel: "FULL CONTROL"
      };
      setUser(userData);
      localStorage.setItem("vti_admin_user", JSON.stringify(userData));
      return userData;
    } else {
      const err = new Error("Invalid username or password.");
      err.response = { data: { message: "Invalid administrator credentials." } };
      throw err;
    }
  };

  const register = async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      data: {
        message: "Registration complete. Credentials were sent to the registered email."
      }
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vti_admin_user");
  };

  return { user, loading, login, register, logout };
}
