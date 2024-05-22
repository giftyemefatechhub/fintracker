import React, { useState } from "react";
import "./ContactUs.css"; // Assuming you have a Contact.css file for styling

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulating message sent success
      setTimeout(() => {
        console.log("Message sent successfully!");
        setMessage("Message sent successfully!");

        // Clear the form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }, 1000);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessage("Failed to send message.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Contact;
