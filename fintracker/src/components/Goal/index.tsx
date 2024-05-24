import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type GoalProps = {
  goal: number;
  setGoal: (newGoal: number) => void;
};

const Goal: React.FC<GoalProps> = ({ goal, setGoal }) => {
  const [newGoal, setNewGoal] = useState<number>(0);

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGoal(Number(e.target.value));
  };

  const handleSetGoal = async () => {
    try {
      const response = await fetch("https://fintracker-1.onrender.com/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: "savings", amount: newGoal }),
      });

      if (!response.ok) {
        throw new Error("Failed to set goal");
      }

      // Update the goal in the frontend state if the request is successful
      setGoal(newGoal);
    } catch (error) {
      console.error("Error setting goal:", error);
    }
  };

  return (
    <div className="goal-container card shadow-sm p-3 mb-5 bg-white rounded">
      <div className="card-body">
        <h2 className="card-title">Goal</h2>
        <p className="card-text">Your goal is to save ${goal} this month.</p>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            value={newGoal}
            onChange={handleGoalChange}
            placeholder="Set new goal"
          />
          <button className="btn btn-primary" onClick={handleSetGoal}>Set Goal</button>
        </div>
      </div>
    </div>
  );
};

export default Goal;
