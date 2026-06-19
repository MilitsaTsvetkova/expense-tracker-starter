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

This is a single-file React app (Vite). All logic lives in `src/App.jsx` — there are no sub-components, no routing, and no external state management. `src/App.css` holds all styles.

State managed in `App`:
- `transactions` — array of `{ id, description, amount, type, category, date }`
- Form fields: `description`, `amount`, `type`, `category`
- Filter fields: `filterType`, `filterCategory`

`amount` is stored as a **string** throughout (from the seeded data and from the `<input type="number">`). The `totalIncome`/`totalExpenses` reducers do not parse it, which causes string concatenation instead of numeric addition — this is the intentional bug in the starter project.

The seeded transaction "Freelance Work" (id 4) is also miscategorized as `type: "expense"` when it should be `"income"`.
