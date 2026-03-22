import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (endpoint, formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Request Failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setUser(data.user);

      setSuccess(data.message || "Successfully");
      setError(null);

      return data;
    } catch (error) {
      setError(error.message);
      console.error("full error", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (formData) => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${baseUrl}/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new error(data.message || "Update Failed");
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setSuccess(data.message);

      return data;
    } catch (error) {
      setError(error.message);
      throw Error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => handleSubmit("/signup", formData);
  const signin = async (formData) => handleSubmit("/signin", formData);

  const forgotpassword = async (formData) =>
    handleSubmit("/forgotpassword", formData);
  const logout = () => {
    setUser(null);
    setSuccess(null);
    setError(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // localStorage.removeItem(`accentColor_${currentUserId}`);
    // localStorage.removeItem(`theme_${currentUserId}`);
    // localStorage.removeItem(`fontSize_${currentUserId}`);

    // document.documentElement.style.setProperty('--brand', '#4f46e5');
    // document.documentElement.style.fontSize = '16px';
    // document.documentElement.classList.remove('dark');
  };

  return (
    <AuthContext.Provider
      value={{
        forgotpassword,
        error,
        loading,
        logout,
        signin,
        signup,
        success,
        setSuccess,
        setUser,
        user,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
