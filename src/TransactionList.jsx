import { useState } from 'react'

const categories = ['food', 'housing', 'utilities', 'transport', 'entertainment', 'salary', 'other'];

const CAT_COLORS = {
  food: '#f97316',
  housing: '#8b5cf6',
  utilities: '#3b82f6',
  transport: '#10b981',
  entertainment: '#ec4899',
  salary: '#6b7280',
  other: '#eab308',
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  let filtered = transactions;
  if (filterType !== 'all') filtered = filtered.filter(t => t.type === filterType);
  if (filterCategory !== 'all') filtered = filtered.filter(t => t.category === filterCategory);

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No transactions match the current filters.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="th-amount">Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td className="td-date">{formatDate(t.date)}</td>
                <td className="td-desc">{t.description}</td>
                <td>
                  <span className="cat-badge">
                    <span
                      className="cat-dot"
                      style={{ background: CAT_COLORS[t.category] || '#94a3b8' }}
                    />
                    {t.category.charAt(0).toUpperCase() + t.category.slice(1)}
                  </span>
                </td>
                <td className={`td-amount ${t.type === 'income' ? 'income-amount' : 'expense-amount'}`}>
                  {t.type === 'income' ? '+' : '−'}{fmt(t.amount)}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => { if (window.confirm('Delete this transaction?')) onDelete(t.id); }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList;
