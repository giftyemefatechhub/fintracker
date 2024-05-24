const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const Signup = require("./models/Signup"); // Corrected import path
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Parse incoming JSON requests

const __dirname_import = path.dirname(require.main.filename); // Use __dirname to get the directory name of the current module

app.use(express.static(path.join(__dirname_import, '../fintracker/dist')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Define routes
const loginRoute = require("./loginRoute");
const signupRoute = require("./signupRoute"); // Corrected import path
const goalRoutes = require("./goalRoutes");
const transactionRoute = require("./transactions"); // Import the transactions route
const dashboardRoutes = require("./dashboardRoutes");
const contactRoutes = require("./contact");

app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/api/goals", goalRoutes);
app.use("/api/balances", transactionRoute);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contact", contactRoutes);

app.get("/admin/users", async (req, res) => {
  try {
    const users = await Signup.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/admin/users/:id", async (req, res) => {
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

app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;

  // Perform admin login logic here
  // Example:
  if (username === "admin" && password === "adminpassword") {
    res.status(200).json({ message: "Admin login successful" });
  } else {
    res.status(401).json({ error: "Invalid admin credentials" });
  }
});

// Route to handle individual user login
app.get("/login/:username", async (req, res) => {
  try {
    res.json({}); // Placeholder response
  } catch (error) {
    console.error("Error fetching login data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch user data based on ID
app.get("/signup/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Signup.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching signup data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch goals data
app.get("/api/goals", async (req, res) => {
  try {
    res.json({}); // Placeholder response
  } catch (error) {
    console.error("Error fetching goals data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch dashboard data
app.get("/api/dashboard", async (req, res) => {
  try {
    res.json({}); // Placeholder response
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch transactions data
app.get("/api/transactions", async (req, res) => {
  try {
    res.json({}); // Placeholder response
  } catch (error) {
    console.error("Error fetching transactions data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to serve the frontend application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname_import, '../fintracker/dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
