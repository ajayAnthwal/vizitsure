"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token && pathname !== "/login") {
      window.location.href = "/login";
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname]);

  if (!isAuthenticated && pathname !== "/login") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthWrapper;
