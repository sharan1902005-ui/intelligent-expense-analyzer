import type { Expense } from '../lib/parser'

interface Props {
  expenses: Expense[]
}

export default function MonthlyBreakdown({ expenses }: Props) {
  const byMonth = expenses.reduce<Record<string, Record<string, number>>>((acc, e) => {
    const month = e.date.slice(0, 7)
    acc[month] ??= {}
    acc[month][e.category] = (acc[month][e.category] ?? 0) + e.amount
    return acc
  }, {})

  const months = Object.keys(byMonth).sort()
  if (!months.length) return null

  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <h3 className="mb-4 font-semibold text-gray-700">Monthly Breakdown</h3>
      <div className="space-y-4">
        {months.map((month) => (
          <div key={month}>
            <p className="mb-1 text-sm font-medium text-gray-600">{month}</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(byMonth[month]).map(([cat, amt]) => (
                <span key={cat} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                  {cat}: ${amt.toFixed(2)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
