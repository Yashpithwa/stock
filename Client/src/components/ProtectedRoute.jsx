// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("userToken"); // check token in localStorage
  if (!token) {
    // agar token nahi hai, redirect to login
    return <Navigate to="/login" replace />;
  }
  // agar token hai, page render kar do
  return children;
};

export default ProtectedRoute;
