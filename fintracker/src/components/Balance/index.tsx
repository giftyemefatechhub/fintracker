import React, { useState } from 'react';
import "./Balance.css";

interface BalanceProps {
  balance: number;
  topUpBalance: (amount: number, method: string) => void;
}

const Balance: React.FC<BalanceProps> = ({ balance, topUpBalance }) => {
  const [amount, setAmount] = useState<number>(0);
  const [method, setMethod] = useState<string>('cash');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
  };

  const handleTopUp = () => {
    if (amount > 0 && method) {
      topUpBalance(amount, method);
    } else {
      alert('Please enter a valid amount and select a payment method.');
    }
  };

  return (
    <div>
      <h2>Balance: ${balance.toFixed(2)}</h2>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount to top up"
          />
        </label>
      </div>
      <div>
        <label>
          Payment Method:
          <select value={method} onChange={handleMethodChange}>
            <option value="cash">Cash</option>
            <option value="swish">Swish</option>
            <option value="stripe">Stripe</option>
            <option value="card">Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
      </div>
      <button onClick={handleTopUp}>Top Up Balance</button>
    </div>
  );
};

export default Balance;
