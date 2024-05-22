const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  month: { type: String, required: true },
  totalExpenses: { type: Number, required: true },
  totalIncome: { type: Number, required: true },
  totalIntendedSavings: { type: Number, required: true },
  totalCurrentBalanceAfterExpenses: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

module.exports = Dashboard;
