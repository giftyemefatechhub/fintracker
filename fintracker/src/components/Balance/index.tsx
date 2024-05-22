// src/components/Balance/index.tsx
import React from 'react';

interface BalanceProps {
  balance: number;
  topUpBalance: (amount: number, method: string) => void;
}

const Balance: React.FC<BalanceProps> = ({ balance, topUpBalance }) => {
  const handleTopUp = () => {
    const amount = parseFloat(prompt('Enter amount to top up:') || '0');
    const method = prompt('Enter payment method:');
    if (amount > 0 && method) {
      topUpBalance(amount, method);
    } else {
      alert('Please enter a valid amount and payment method.');
    }
  };

  return (
    <div>
      <h2>Balance: {balance}</h2>
      <button onClick={handleTopUp}>Top Up Balance</button>
    </div>
  );
};

export default Balance;