import type { Expense } from '../lib/parser'

interface Props {
  expenses: Expense[]
}

export default function TransactionsTable({ expenses }: Props) {
  if (!expenses.length) return null

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left text-gray-500">
          <tr>
            {['Date', 'Description', 'Category', 'Amount'].map((h) => (
              <th key={h} className="px-4 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {expenses.map((e, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-500">{e.date}</td>
              <td className="px-4 py-2 text-gray-800">{e.description}</td>
              <td className="px-4 py-2">
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">{e.category}</span>
              </td>
              <td className="px-4 py-2 font-medium text-gray-800">${e.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
