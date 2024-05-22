const express = require("express");
const router = express.Router();


// Import the Signup model
const Signup = require("./models/Signup"); // Adjust the path as needed

// Define the POST route for login
router.post("/", async (req, res) => {
  try {
    const { firstName, password } = req.body; // Use firstName for login

    // Find user by firstName
    const user = await Signup.findOne({ firstName });

    if (user) {
      // Check if user is active
      if (!user.isActive) {
        return res.status(403).json({ error: "User account is deactivated" });
      }

      // Check if password matches
      if (user.password === password) {
        // Password matches, login successful
        res.status(200).json({ message: "Login successful" });
      } else {
        // Password does not match
        res.status(401).json({ error: "Invalid password" });
      }
    } else {
      // firstName not found
      res.status(401).json({ error: "Invalid first name" });
    }
  } catch (error) {
    console.error("Error processing login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
