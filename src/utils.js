export const CATEGORIES = [
  'food', 'housing', 'utilities', 'transport', 'entertainment', 'salary', 'other',
];

export const CATEGORY_COLORS = {
  food: '#f97316',
  housing: '#8b5cf6',
  utilities: '#3b82f6',
  transport: '#10b981',
  entertainment: '#ec4899',
  salary: '#6b7280',
  other: '#eab308',
};

export const formatCurrency = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
