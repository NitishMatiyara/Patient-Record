import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import Dashboard from "../pages/Dashboard/Dashboard";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Cookies.get("userToken");
  if (!isAuthenticated) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/home" />;
  }

  // authorized so return child components
  return children ? (
    children
  ) : (
    <div>
      <Dashboard /> <Outlet />
    </div>
  );
};

export default ProtectedRoute;
