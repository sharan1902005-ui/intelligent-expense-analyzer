import { useRef } from 'react'
import { Upload } from 'lucide-react'
import { parseFile, type Expense } from '../lib/parser'
import { saveExpenses } from '../lib/storage'

interface Props {
  onData: (expenses: Expense[]) => void
}

export default function DataInput({ onData }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    const expenses = await parseFile(file)
    saveExpenses(expenses)
    onData(expenses)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current?.click()}
      className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50 p-10 text-center hover:bg-indigo-100"
    >
      <Upload size={36} className="text-indigo-400" />
      <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
      <p className="text-xs text-gray-400">Supports CSV, XLSX, XLS, PDF</p>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx,.xls,.pdf"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </div>
  )
}
