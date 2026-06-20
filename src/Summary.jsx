const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const balanceClass = balance > 0 ? 'positive' : balance < 0 ? 'negative' : '';

  return (
    <div className="summary">
      <span className="balance-label">Current Balance</span>
      <p className={`balance-hero-amount ${balanceClass}`}>{fmt(balance)}</p>
      <div className="summary-stats">
        <div className="stat">
          <span className="stat-label">Income</span>
          <span className="stat-amount income">{fmt(totalIncome)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Expenses</span>
          <span className="stat-amount expense">{fmt(totalExpenses)}</span>
        </div>
      </div>
    </div>
  );
}

export default Summary;
