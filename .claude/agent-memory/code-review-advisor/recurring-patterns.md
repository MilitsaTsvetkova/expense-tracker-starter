---
name: recurring-patterns
description: Recurring anti-patterns, good patterns, and review findings from the first full codebase review
metadata:
  type: project
---

## Recurring Anti-Patterns Found (First Full Review — 2026-06-20)

### 1. Duplicated Constants Across Files
- `categories` array appears in both TransactionForm.jsx and TransactionList.jsx
- Category color maps appear as `CAT_COLORS` in TransactionList.jsx and `COLORS` in SpendingChart.jsx — identical shape, different names
- `fmt()` Intl currency formatter duplicated in Summary.jsx and TransactionList.jsx
- Fix: extract to a shared `src/constants.js` or `src/utils.js`

### 2. `window.confirm()` for Destructive Actions
- TransactionList.jsx line 83 uses `window.confirm()` for delete confirmation
- Blocks the main thread, not styleable, breaks in some iframe/test environments
- Fix: replace with an inline confirmation state or a modal

### 3. Functional State Updates — Missing Updater Function
- App.jsx `handleAdd` uses `setTransactions([...transactions, transaction])` — captures stale `transactions` from closure
- App.jsx `handleDelete` uses `setTransactions(transactions.filter(...))` — same stale closure risk
- Fix: use functional updater form: `setTransactions(prev => [...prev, transaction])`

### 4. No Input Validation Beyond Presence Check
- TransactionForm.jsx only checks `!description || !amount` — allows negative amounts, amounts of "0", and whitespace-only descriptions
- Fix: check `parseFloat(amount) > 0` and `description.trim()`

### 5. `currentMonth` Computed Outside Component — Minor
- App.jsx line 28 computes `currentMonth` outside the JSX but still inside the component function body — fine, but if the app ever ran across a month boundary without remounting this would not update. Low risk.

## Good Patterns Worth Preserving
- Date string parsed with `'T00:00:00'` suffix to avoid UTC timezone shift — correct and intentional
- Empty state handled in TransactionList with a meaningful message
- SpendingChart returns null when data is empty — clean guard
- CSS custom properties (tokens) used throughout — maintainable theming
- `prefers-reduced-motion` media query in CSS — good accessibility default
- `StrictMode` enabled in main.jsx
- Labels with `htmlFor` properly wired to input `id` attributes in TransactionForm
- `key` props correctly set on all list renders (using stable `id` or category string, not index)
- Responsive breakpoint at 660px in CSS
