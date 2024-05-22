const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define the goal schema
const goalSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define the Goal model
const Goal = mongoose.model("Goal", goalSchema);

// GET route to fetch the current goal
router.get("/", async (req, res) => {
  try {
    const goalData = await Goal.findOne().sort({ createdAt: -1 }); // Assuming you want the latest goal
    res.json({ goal: goalData.amount }); // Return only the goal amount
  } catch (error) {
    console.error("Error fetching goal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST route to set a new goal
router.post("/", async (req, res) => {
  try {
    const { category, amount } = req.body;
    if (!category || !amount) {
      return res.status(400).json({ error: "Category and amount are required" });
    }
    const newGoal = new Goal({
      category,
      amount,
    });
    await newGoal.save();
    res.status(201).json({ message: "Goal saved successfully", goal: newGoal });
  } catch (error) {
    console.error("Error saving goal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
