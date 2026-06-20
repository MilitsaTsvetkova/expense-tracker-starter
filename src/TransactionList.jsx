import { useState } from 'react'
import { CATEGORIES, CATEGORY_COLORS, formatCurrency, capitalize } from './utils';

const formatDate = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const filtered = transactions.filter(t =>
    (filterType === 'all' || t.type === filterType) &&
    (filterCategory === 'all' || t.category === filterCategory)
  );

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select
          aria-label="Filter by type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          aria-label="Filter by category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{capitalize(cat)}</option>
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
              <th><span className="sr-only">Actions</span></th>
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
                      style={{ background: CATEGORY_COLORS[t.category] || '#94a3b8' }}
                    />
                    {capitalize(t.category)}
                  </span>
                </td>
                <td className={`td-amount ${t.type === 'income' ? 'income-amount' : 'expense-amount'}`}>
                  {t.type === 'income' ? '+' : '−'}{formatCurrency(t.amount)}
                </td>
                <td>
                  {pendingDeleteId === t.id ? (
                    <>
                      <button className="delete-btn" onClick={() => { onDelete(t.id); setPendingDeleteId(null); }}>Confirm</button>
                      <button onClick={() => setPendingDeleteId(null)}>Cancel</button>
                    </>
                  ) : (
                    <button className="delete-btn" onClick={() => setPendingDeleteId(t.id)}>Delete</button>
                  )}
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
