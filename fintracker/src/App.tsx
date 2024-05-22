import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/AboutUs";
import Contact from "./components/ContactUs";
import Admin from "./components/Admin";
import AdminLogin from "./components/AdminLogin"; // Import the AdminLogin component
import PrivacyPolicy from "./components/PrivacyPolicy";
import Dashboard from "./components/Dashboard";
import LoginNav from "./components/LoginNav"; 
import Logout from "./components/Logout"; 
import Goal from "./components/Goal/index"; 
import Balance from "./components/Balance/index";
import Spendings from "./components/Spendings/index";

type Transaction = {
  id: number;
  category: string;
  amount: number;
  ocrNumber: string;
  receiver: string;
  receiverBankNumber: string;
  paymentMethod: string;
  paid: boolean;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [_id, setId] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<number>(1000); // Initial balance
  const [goal, setGoal] = useState<number>(500); // Example goal

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
      fetchId();
    }
  }, []);

  const fetchId = async () => {
    try {
      const response = await fetch("http://localhost:3001/signup/id");
      const data = await response.json();
      setId(data._id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    fetchId();
    localStorage.setItem("isLoggedIn", "true");
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
    if (transaction.paid) {
      setBalance(balance - transaction.amount);
    }
  };

  const togglePaymentStatus = (id: number) => {
    setTransactions(transactions.map(transaction => {
      if (transaction.id === id) {
        const updatedTransaction = { ...transaction, paid: !transaction.paid };
        setBalance(balance + (updatedTransaction.paid ? -transaction.amount : transaction.amount));
        return updatedTransaction;
      }
      return transaction;
    }));
  };

  const topUpBalance = (amount: number, method: string) => {
    if (amount > 0 && method) {
      setBalance(balance + amount);
    } else {
      alert("Please enter a valid amount and select a payment method.");
    }
  };

  return (
    <Router>
      <div>
        {isLoggedIn && <LoginNav />}
        {!isLoggedIn && <Navbar />}
        <div style={{ paddingTop: isLoggedIn ? "80px" : "0" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            // Inside the return statement of App.tsx
            <Route path="/admin/login" element={<AdminLogin onAdminLogin={handleLogin} />} /> // Route for Admin login

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/dashboard" element={
              isLoggedIn ? <Dashboard 
                goal={goal} 
                setGoal={setGoal} 
                balance={balance} 
                topUpBalance={topUpBalance} 
                transactions={transactions} 
                addTransaction={addTransaction} 
                togglePaymentStatus={togglePaymentStatus}
              /> : <Navigate to="/" />
            } />
            <Route path="/logout" element={<Logout />} />
            <Route path="/goal" element={<Goal goal={goal} setGoal={setGoal} />} />
            <Route path="/balance" element={<Balance balance={balance} topUpBalance={topUpBalance} />} />
            <Route path="/spendings" element={<Spendings transactions={transactions} addTransaction={addTransaction} togglePaymentStatus={togglePaymentStatus} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
