import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type BalanceProps = {
  balance: number;
  onTopUp: (newBalance: number) => void;
};

const Balance: React.FC<BalanceProps> = ({ balance, onTopUp }) => {
  const [topUpAmount, setTopUpAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopUpAmount(Number(e.target.value));
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleTopUp = async () => {
    if (topUpAmount <= 0) {
      alert('Please enter a valid top-up amount.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/balances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: topUpAmount, method: paymentMethod }),
      });

      if (!response.ok) {
        throw new Error('Failed to top up balance');
      }

      const newBalance = balance + topUpAmount;
      onTopUp(newBalance);
      setTopUpAmount(0);
    } catch (error) {
      console.error('Error topping up balance:', error);
    }
  };

  return (
    <div className="balance-container card shadow-sm p-3 mb-5 bg-white rounded">
      <div className="card-body">
        <h2 className="card-title">Balance</h2>
        <p className="card-text">Your current balance is ${balance}</p>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            value={topUpAmount === 0 ? '' : topUpAmount}
            onChange={handleAmountChange}
            placeholder="Top-up amount"
          />
        </div>
        <div className="input-group mb-3">
          <select
            className="form-select"
            value={paymentMethod}
            onChange={handleMethodChange}
          >
            <option value="" disabled>Select payment method</option>
            <option value="cash">Cash</option>
            <option value="paypal">PayPal</option>
            <option value="swish">Swish</option>
            <option value="stripe">Stripe</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleTopUp}>
          Top Up
        </button>
      </div>
    </div>
  );
};

export default Balance;
