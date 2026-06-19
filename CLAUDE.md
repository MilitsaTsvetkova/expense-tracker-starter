# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build
npm run lint     # ESLint check
npm run preview  # preview production build locally
```

No test suite exists in this project.

## Architecture

React + Vite SPA. All styles live in `src/App.css`. No routing, no external state management.

### Component tree

```
App
├── Summary          — receives transactions, derives totalIncome/totalExpenses/balance internally
├── TransactionForm  — owns its own form state; calls onAdd(transaction) prop on submit
└── TransactionList  — owns its own filter state; receives transactions prop
```

**`App`** holds the single shared piece of state — the `transactions` array — and passes it down. It exposes a `handleAdd` callback to `TransactionForm` which appends the new transaction.

**`TransactionForm`** manages `description`, `amount`, `type`, and `category` locally. On submit it calls `onAdd` with a fully-formed transaction object (`amount` parsed to a float via `parseFloat`).

**`TransactionList`** manages `filterType` and `filterCategory` locally and derives the filtered view from the `transactions` prop on each render.

### Data shape

```js
{ id, description, amount, type, category, date }
// amount is always a number
// type is "income" | "expense"
// category is one of: food, housing, utilities, transport, entertainment, salary, other
```

The seeded transaction "Freelance Work" (id 4) is intentionally miscategorized as `type: "expense"` — this is a known bug from the starter project.
