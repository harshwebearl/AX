import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const location = useLocation();

  try {
    const auth = localStorage.getItem("admin-auth");
    const token = localStorage.getItem("admin-token");
    const admin = localStorage.getItem("admin");

    // Only allow if all three pieces exist and auth is "true"
    if (auth === "true" && token && admin) {
      return children || null;
    }
  } catch (err) {
    // If access to localStorage throws, redirect to login
    console.error("RequireAuth localStorage error:", err);
  }

  // Preserve where the user was trying to go
  return <Navigate to="/login" replace state={{ from: location }} />;
}
