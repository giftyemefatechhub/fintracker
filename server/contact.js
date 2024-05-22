// src/routes/contact.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the Contact schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define the Contact model
const Contact = mongoose.model("Contact", contactSchema);

// Define the POST route for saving a new contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate if all required fields are provided
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new contact document
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save the new contact message to the database
    await newContact.save();

    // Send success response
    res.status(201).json({ message: "Message sent successfully", contact: newContact });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
