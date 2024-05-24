const Signup = require("./models/Signup");

const express = require("express");
const router = express.Router();

// Route to fetch all users
router.get("/users", async (req, res) => {
  try {
    const users = await Signup.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to update user's activation status
router.patch("/admin/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { isActive } = req.body;

    // Convert string to boolean if necessary
    isActive = isActive === 'true';

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

// Route to create a new user
router.post("/signup", async (req, res) => {
  try {
    const newUser = new Signup(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
