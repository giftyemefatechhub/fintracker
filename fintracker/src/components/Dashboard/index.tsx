// src/components/Dashboard/index.tsx
import React from "react";
import Spendings from "../Spendings";

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
interface DashboardProps {
  goal: number; // Add goal to props
  setGoal: (newGoal: number) => void;
  balance: number;
  topUpBalance: (amount: number, method: string) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  togglePaymentStatus: (id: number) => void;
}


const Dashboard: React.FC<DashboardProps> = ({
  transactions,
  addTransaction,
  togglePaymentStatus,
  balance
}) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Spendings
        balance={balance}
        transactions={transactions}
        addTransaction={addTransaction}
        togglePaymentStatus={togglePaymentStatus}
      />
    </div>
  );
};

export default Dashboard;
