import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/signup');
  };

  return (
    <div className="homepage">
      <div className="hero">
        <div className="hero-content">
          <h1>Achieving Your Financial Goals</h1>
          <div className="home-container">
            <p>Take your finances to the next level. Learn to make a budget that works for you, save for things that matter most, and spend with confidence.</p>
          </div>
          <button onClick={handleGetStartedClick}>GET STARTED</button>
        </div>
        <div className="hero-right">
          <img src="/FinTracker.svg" alt="Home page image" />
          <div className="learn">
            <h2>Learn how to:</h2>
            <p>- Plan Budget</p>
            <p>- Track Expenses</p>
            <p>- Save Money</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;