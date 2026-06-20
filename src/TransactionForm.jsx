import { useState } from 'react'

const categories = ['food', 'housing', 'utilities', 'transport', 'entertainment', 'salary', 'other'];

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('food');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!description.trim() || !parsedAmount || parsedAmount <= 0) return;

    onAdd({
      id: Date.now(),
      description: description.trim(),
      amount: parsedAmount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription('');
    setAmount('');
    setType('expense');
    setCategory('food');
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="tx-description">Description</label>
          <input
            id="tx-description"
            type="text"
            placeholder="e.g. Rent, Salary…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="tx-amount">Amount</label>
          <input
            id="tx-amount"
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="tx-type">Type</label>
          <select id="tx-type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="tx-category">Category</label>
          <select id="tx-category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button className="form-submit" type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm;
