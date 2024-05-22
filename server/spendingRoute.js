const express = require("express");
const mongoose = require("mongoose");
const fetch = require("node-fetch");

const router = express.Router();

// Spending Schema
const spendingSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  ocrNumber: String,
  receiver: String,
  receiverBankNumber: String,
  paymentMethod: String,
});

const Spending = mongoose.model("Spending", spendingSchema);

// Route to create a new spending
router.post("/api/spendings", async (req, res) => {
  try {
    const { category, amount, ocrNumber, receiver, receiverBankNumber, paymentMethod } = req.body;
    // Deduct the amount from the balance
    await deductFromBalance(amount);
    // Save the spending details
    const newSpending = new Spending({ category, amount, ocrNumber, receiver, receiverBankNumber, paymentMethod });
    await newSpending.save();
    res.status(201).json({ message: "Spending saved successfully" });
  } catch (error) {
    console.error("Error saving spending:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const deductFromBalance = async (amount) => {
  try {
    const response = await fetch("https://fintracker-1.onrender.com//api/balance/withdrawal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) {
      throw new Error("Failed to deduct from balance");
    }
    console.log("Deducted from balance successfully!");
  } catch (error) {
    console.error("Failed to deduct from balance:", error);
    throw error;
  }
};

module.exports = router;
