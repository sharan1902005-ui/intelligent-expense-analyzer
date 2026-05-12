import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import type { Expense } from '../lib/parser'

interface Message {
  role: 'user' | 'bot'
  text: string
}

interface Props {
  expenses: Expense[]
}

function answer(query: string, expenses: Expense[]): string {
  const q = query.toLowerCase()
  if (!expenses.length) return 'No expense data loaded yet.'

  const total = expenses.reduce((s, e) => s + e.amount, 0)

  if (q.includes('total')) return `Total spending: $${total.toFixed(2)}`

  if (q.includes('most') || q.includes('highest') || q.includes('top')) {
    const byCategory = expenses.reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] ?? 0) + e.amount
      return acc
    }, {})
    const top = Object.entries(byCategory).sort(([, a], [, b]) => b - a)[0]
    return `Highest category: ${top[0]} ($${top[1].toFixed(2)})`
  }

  if (q.includes('how many') || q.includes('count')) return `${expenses.length} transactions loaded.`

  if (q.includes('average') || q.includes('avg')) return `Average per transaction: $${(total / expenses.length).toFixed(2)}`

  return `You have ${expenses.length} transactions totaling $${total.toFixed(2)}. Ask about totals, categories, or averages.`
}

export default function ChatBot({ expenses }: Props) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'bot', text: 'Hi! Ask me about your expenses.' }])
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    const userMsg: Message = { role: 'user', text: input }
    const botMsg: Message = { role: 'bot', text: answer(input, expenses) }
    setMessages((m) => [...m, userMsg, botMsg])
    setInput('')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="flex h-96 w-80 flex-col rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between rounded-t-2xl bg-indigo-600 px-4 py-3">
            <span className="font-semibold text-white">Expense Assistant</span>
            <button onClick={() => setOpen(false)}><X size={18} className="text-white" /></button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 p-3">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${m.role === 'user' ? 'ml-auto bg-indigo-100 text-indigo-900' : 'bg-gray-100 text-gray-800'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t p-3">
            <input
              className="flex-1 rounded-lg border px-3 py-1.5 text-sm outline-none focus:border-indigo-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask something..."
            />
            <button onClick={send} className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-700">
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="rounded-full bg-indigo-600 p-4 text-white shadow-lg hover:bg-indigo-700">
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  )
}
