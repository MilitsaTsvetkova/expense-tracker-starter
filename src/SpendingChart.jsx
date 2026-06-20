import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CATEGORY_COLORS, formatCurrency, capitalize } from './utils';

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: capitalize(category),
    value: amount,
    category,
  }));

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="spending-chart" role="img" aria-label="Pie chart of spending by category">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry) => (
              <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category] || '#94a3b8'} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
