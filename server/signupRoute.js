const express = require("express");
const router = express.Router();
const Signup = require('./models/Signup');



// Define the POST route for signup
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Create a new document in the Signup collection
    const newSignup = new Signup({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      isActive: true
    });

    // Save the new document to the database
    await newSignup.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error processing signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to update user's activation status
router.patch("/activate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const user = await Signup.findByIdAndUpdate(id, { isActive }, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User status updated successfully", user });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
