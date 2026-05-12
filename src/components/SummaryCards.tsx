import type { Expense } from '../lib/parser'

interface Props {
  expenses: Expense[]
}

export default function SummaryCards({ expenses }: Props) {
  const total = expenses.reduce((s, e) => s + e.amount, 0)
  const avg = expenses.length ? total / expenses.length : 0
  const max = expenses.length ? Math.max(...expenses.map((e) => e.amount)) : 0

  const cards = [
    { label: 'Total Spent', value: `$${total.toFixed(2)}` },
    { label: 'Transactions', value: expenses.length },
    { label: 'Avg per Transaction', value: `$${avg.toFixed(2)}` },
    { label: 'Largest Expense', value: `$${max.toFixed(2)}` },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">{c.label}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-800">{c.value}</p>
        </div>
      ))}
    </div>
  )
}
