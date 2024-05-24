import React from "react";
import Spendings from "../Spendings";
import Balance from "../Balance";
import Goal from "../Goal";

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
  goal: number;
  setGoal: (newGoal: number) => void;
  balance: number;
  topUpBalance: (amount: number, method: string) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  togglePaymentStatus: (id: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  goal,
  setGoal,
  balance,
  topUpBalance,
  transactions,
  addTransaction,
  togglePaymentStatus,
}) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Goal goal={goal} setGoal={setGoal} />
      <Balance balance={balance} topUpBalance={topUpBalance} />
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
