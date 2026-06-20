---
name: project-architecture
description: Component tree, data shape, established conventions, known intentional bugs, and tech stack for the expense-tracker-starter project
metadata:
  type: project
---

## Stack
- React 19 + Vite 7, single SPA, no routing, no external state management
- Recharts for the pie chart (SpendingChart)
- ESLint with react-hooks and react-refresh plugins — passes clean as of first review

## Component Tree
- App — holds single `transactions` array state; exposes `handleAdd` and `handleDelete` callbacks
- Summary — receives transactions prop, derives totals internally; no state
- SpendingChart — receives transactions prop, derives expense-by-category data; no state
- TransactionForm — owns form state (description, amount, type, category); calls onAdd(transaction) on submit
- TransactionList — owns filter state (filterType, filterCategory); receives transactions + onDelete props

## Data Shape
```js
{ id, description, amount (number), type ('income'|'expense'), category, date (YYYY-MM-DD string) }
```
Categories: food, housing, utilities, transport, entertainment, salary, other

## Known Intentional Bug
"Freelance Work" (id 4) is seeded as `type: "expense"` with `category: "salary"` — intentionally miscategorized from the starter project. Do NOT flag this as a new bug.

## Established Conventions
- All styles in src/App.css using CSS custom properties (tokens in :root)
- CSS class names are kebab-case
- Event handlers prefixed with `handle` in App; inline arrow functions used in child components for onChange
- Function declarations (not arrow functions) for components
- Named exports for constants (categories array, COLORS/CAT_COLORS objects) at module level
- `fmt()` currency formatter duplicated in Summary.jsx and TransactionList.jsx (known duplication)
- `categories` array duplicated in TransactionForm.jsx and TransactionList.jsx (known duplication)
- CAT_COLORS in TransactionList.jsx and COLORS in SpendingChart.jsx are identical maps — duplication
- Date parsing uses `dateStr + 'T00:00:00'` suffix to avoid UTC-offset midnight-shift bug — this is correct
- `Date.now()` used for transaction IDs (not a UUID, but acceptable for this scale)
- No PropTypes or TypeScript — intentional for this project scale
