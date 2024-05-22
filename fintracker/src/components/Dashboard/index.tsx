import React from 'react';
import Balance from '../Balance/index';
import Goal from '../Goal/index';
import Spendings from '../Spendings/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

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
  setGoal: React.Dispatch<React.SetStateAction<number>>;
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
  togglePaymentStatus
}) => {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Dashboard</h1>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <Goal goal={goal} setGoal={setGoal} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <Balance balance={balance} topUpBalance={topUpBalance} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <Spendings
                transactions={transactions}
                addTransaction={addTransaction}
                togglePaymentStatus={togglePaymentStatus}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Add a visual indicator if spending exceeds the goal */}
      {transactions.reduce((acc, transaction) => acc + (transaction.paid ? transaction.amount : 0), 0) > goal && (
        <div className="alert alert-danger text-center" role="alert">
          Warning: You have exceeded your spending goal for the month!
        </div>
      )}
    </div>
  );
};

export default Dashboard;
