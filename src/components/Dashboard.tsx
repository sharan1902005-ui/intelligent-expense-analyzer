import { useState } from 'react'
import { loadExpenses } from '../lib/storage'
import type { Expense } from '../lib/parser'
import DataInput from './DataInput'
import SummaryCards from './SummaryCards'
import Charts from './Charts'
import TransactionsTable from './TransactionsTable'
import MonthlyBreakdown from './MonthlyBreakdown'
import ExportButtons from './ExportButtons'
import ChatBot from './ChatBot'

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>(loadExpenses)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Expense Analyzer</h1>
          <ExportButtons expenses={expenses} />
        </div>

        <DataInput onData={setExpenses} />
        <SummaryCards expenses={expenses} />
        <Charts expenses={expenses} />
        <MonthlyBreakdown expenses={expenses} />
        <TransactionsTable expenses={expenses} />
      </div>
      <ChatBot expenses={expenses} />
    </div>
  )
}
