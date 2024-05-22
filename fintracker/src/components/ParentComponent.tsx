// ParentComponent.tsx
import React from "react";
import AdminLogin from "./AdminLogin";

const ParentComponent: React.FC = () => {
  const handleAdminLogin = () => {
    // Logic for handling admin login
  };

  return <AdminLogin onAdminLogin={handleAdminLogin} />;
};

export default ParentComponent;
