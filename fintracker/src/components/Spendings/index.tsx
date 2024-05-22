import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Spendings.css";

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

interface SpendingsProps {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  togglePaymentStatus: (id: number) => void;
}

const Spendings: React.FC<SpendingsProps> = ({
  transactions,
  addTransaction,
  togglePaymentStatus
}) => {
  const [categories, setCategories] = useState<string[]>(["Utilities", "Rent", "Groceries"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [amount, setAmount] = useState<number | string>(0);
  const [ocrNumber, setOcrNumber] = useState("");
  const [receiver, setReceiver] = useState("");
  const [receiverBankNumber, setReceiverBankNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategory("");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value ? Number(value) : "");
  };

  const handleOcrNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOcrNumber(e.target.value);
  };

  const handleReceiverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiver(e.target.value);
  };

  const handleReceiverBankNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverBankNumber(e.target.value);
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handlePay = () => {
    if (selectedCategory && typeof amount === 'number' && amount > 0) {
      const newTransaction: Transaction = {
        id: transactions.length + 1,
        category: selectedCategory,
        amount: amount,
        ocrNumber: ocrNumber,
        receiver: receiver,
        receiverBankNumber: receiverBankNumber,
        paymentMethod: paymentMethod,
        paid: false
      };
      addTransaction(newTransaction);
      setAmount(0);
      setOcrNumber("");
      setReceiver("");
      setReceiverBankNumber("");
      setPaymentMethod("");
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <div className="spendings-container container mt-4">
      <h1>Pay Bills and Debts Safely</h1>

      <div className="category-section mb-4">
        <h2>Categories of Bills</h2>
        <div className="input-group mb-3">
          <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="" disabled>Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
            <option value="addCategory">Add Category...</option>
          </select>
        </div>
        {selectedCategory === "addCategory" && (
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={newCategory}
              onChange={handleNewCategoryChange}
              placeholder="Enter new category"
            />
            <button className="btn btn-outline-primary" onClick={handleAddCategory}>Add</button>
          </div>
        )}
      </div>

      <div className="payment-section mb-4">
        <h2>Make a Payment</h2>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            value={amount === 0 ? '' : amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={ocrNumber}
            onChange={handleOcrNumberChange}
            placeholder="Enter OCR number"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={receiver}
            onChange={handleReceiverChange}
            placeholder="Enter receiver name"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={receiverBankNumber}
            onChange={handleReceiverBankNumberChange}
            placeholder="Enter receiver bank number"
          />
        </div>
        <div className="input-group mb-3">
          <select className="form-select" value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="" disabled>Select a payment method</option>
            <option value="cash">Cash</option>
            <option value="paypal">PayPal</option>
            <option value="swish">Swish</option>
            <option value="stripe">Stripe</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={handlePay}>Pay</button>
      </div>

      <div className="transaction-history">
        <h2>Transaction History</h2>
        <ul className="list-group">
          {transactions.map(transaction => (
            <li key={transaction.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                {transaction.category}: ${transaction.amount} - {transaction.receiver} ({transaction.paymentMethod})
              </span>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => togglePaymentStatus(transaction.id)}>
                {transaction.paid ? "Mark as Unpaid" : "Mark as Paid"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Spendings;
