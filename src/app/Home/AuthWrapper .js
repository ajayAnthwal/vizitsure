// src/components/AuthWrapper.js
"use client";  // Ensure that this is a client-side component

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    const token = localStorage.getItem("auth");

    // Redirect to login if no token and not already on the login page
    if (!token && pathname !== "/login") {
      window.location.href = "/login";
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname]);

  if (!isAuthenticated && pathname !== "/login") {
    // Show a loading state while checking authentication
    return <div>Loading...</div>;
  }

  return <>{children}</>; // Render the children (your main content)
};

export default AuthWrapper;
