import React, { useEffect } from "react";

const Logout: React.FC = () => {
  useEffect(() => {
    const handleLogout = () => {
      // Clear any relevant state or local storage
      localStorage.removeItem("isLoggedIn");

      // Navigate to Home page
      window.location.href = "/";
    };

    handleLogout();
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
