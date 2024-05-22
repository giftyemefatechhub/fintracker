const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  ocrNumber: String,
  receiver: String,
  receiverBankNumber: String,
  paymentMethod: String,
  paid: Boolean,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// Route to create a new transaction
router.post("/api/transactions", async (req, res) => {
  try {
    const { category, amount, ocrNumber, receiver, receiverBankNumber, paymentMethod, paid } = req.body;
    const newTransaction = new Transaction({ category, amount, ocrNumber, receiver, receiverBankNumber, paymentMethod, paid });
    await newTransaction.save();
    res.status(201).json({ message: "Transaction saved successfully" });
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
