import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Placeholder for authentication check
const isAuthenticated = () => {
  // Implement JWT/token check here
  return !!localStorage.getItem("token");
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  return isAuthenticated() ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
