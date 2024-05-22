import React, { useState } from "react";

const AdminLogin: React.FC<{ onAdminLogin: () => void }> = ({ onAdminLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulating login success
      setTimeout(() => {
        console.log("Admin login successful!");
        onAdminLogin(); // Call the onAdminLogin function passed from the parent component
        // Redirect to Admin component after successful login
        window.location.href = "/admin"; // Redirect to the admin dashboard
      }, 1000);
    } catch (error) {
      console.error("Admin login failed:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
