import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { Expense } from '../lib/parser'

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6']

interface Props {
  expenses: Expense[]
}

export default function Charts({ expenses }: Props) {
  const byCategory = Object.entries(
    expenses.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + e.amount
      return acc
    }, {})
  ).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))

  const byMonth = Object.entries(
    expenses.reduce<Record<string, number>>((acc, e) => {
      const month = e.date.slice(0, 7)
      acc[month] = (acc[month] ?? 0) + e.amount
      return acc
    }, {})
  )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))

  if (!expenses.length) return null

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-xl bg-white p-4 shadow">
        <h3 className="mb-4 font-semibold text-gray-700">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={byCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
              {byCategory.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => `$${v}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl bg-white p-4 shadow">
        <h3 className="mb-4 font-semibold text-gray-700">Monthly Spending</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={byMonth}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => `$${v}`} />
            <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
