// backend/dashboardRoutes.js

const express = require("express");
const router = express.Router();
const Spending = require("./spendingRoute");
const Goal = require("./goalRoutes");
const Transaction = require("./transactions");

// Route to fetch dashboard data
router.get("/api/dashboard", async (req, res) => {
  try {
    const spendings = await Spending.find();
    const goals = await Goal.find();
    const transactions = await Transaction.find();

    // Calculate total spent
    const totalSpent = spendings.reduce((total, spending) => total + spending.amount, 0);

    // Calculate total income and intended savings
    let totalIncome = 0;
    let totalIntendedSavings = 0;
    goals.forEach((goal) => {
      totalIncome += goal.income;
      totalIntendedSavings += goal.savings;
    });

    // Calculate total transactions
    const totalTransactions = transactions.length;

    res.json({
      totalSpent,
      totalIncome,
      totalIntendedSavings,
      totalTransactions,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
