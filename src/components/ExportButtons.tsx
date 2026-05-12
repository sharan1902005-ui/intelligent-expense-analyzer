import { Download } from 'lucide-react'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import type { Expense } from '../lib/parser'

interface Props {
  expenses: Expense[]
}

export default function ExportButtons({ expenses }: Props) {
  if (!expenses.length) return null

  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(expenses)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Expenses')
    XLSX.writeFile(wb, 'expenses.xlsx')
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(14)
    doc.text('Expense Report', 14, 16)
    doc.setFontSize(10)
    expenses.forEach((e, i) => {
      doc.text(`${e.date}  ${e.description}  ${e.category}  $${e.amount.toFixed(2)}`, 14, 28 + i * 8)
    })
    doc.save('expenses.pdf')
  }

  return (
    <div className="flex gap-3">
      <button onClick={exportCSV} className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700">
        <Download size={16} /> Export Excel
      </button>
      <button onClick={exportPDF} className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
        <Download size={16} /> Export PDF
      </button>
    </div>
  )
}
