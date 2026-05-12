import * as XLSX from 'xlsx'
import { categorize } from './category'

export interface Expense {
  date: string
  description: string
  amount: number
  category: string
}

export async function parseFile(file: File): Promise<Expense[]> {
  const ext = file.name.split('.').pop()?.toLowerCase()

  if (ext === 'csv' || ext === 'xlsx' || ext === 'xls') {
    const buffer = await file.arrayBuffer()
    const wb = XLSX.read(buffer, { type: 'array' })
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(wb.Sheets[wb.SheetNames[0]])
    return rows.map((r) => {
      const desc = String(r['Description'] ?? r['description'] ?? r['Merchant'] ?? '')
      const amount = parseFloat(String(r['Amount'] ?? r['amount'] ?? r['Debit'] ?? 0))
      const date = String(r['Date'] ?? r['date'] ?? '')
      return { date, description: desc, amount: Math.abs(amount), category: categorize(desc) }
    })
  }

  if (ext === 'pdf') {
    const { getDocument } = await import('pdfjs-dist')
    const buffer = await file.arrayBuffer()
    const pdf = await getDocument({ data: buffer }).promise
    const lines: string[] = []
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      lines.push(content.items.map((item: unknown) => (item as { str: string }).str).join(' '))
    }
    return parseTextLines(lines.join('\n'))
  }

  return []
}

function parseTextLines(text: string): Expense[] {
  const dateRegex = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/
  const amountRegex = /\$?([\d,]+\.\d{2})/
  return text
    .split('\n')
    .map((line) => {
      const dateMatch = line.match(dateRegex)
      const amountMatch = line.match(amountRegex)
      if (!dateMatch || !amountMatch) return null
      const desc = line.replace(dateRegex, '').replace(amountRegex, '').trim()
      return {
        date: dateMatch[1],
        description: desc,
        amount: parseFloat(amountMatch[1].replace(',', '')),
        category: categorize(desc),
      }
    })
    .filter(Boolean) as Expense[]
}
