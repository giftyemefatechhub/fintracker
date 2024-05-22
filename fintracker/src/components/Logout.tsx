// src/components/Logout.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the logged-in state
    localStorage.removeItem("isLoggedIn");

    // Redirect to the main page
    navigate("/", { replace: true });
  }, [navigate]);

  return null; // This component does not render anything
};

export default Logout;
