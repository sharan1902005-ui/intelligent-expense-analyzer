import type { Expense } from './parser'

const KEY = 'expenses'

export function saveExpenses(expenses: Expense[]): void {
  localStorage.setItem(KEY, JSON.stringify(expenses))
}

export function loadExpenses(): Expense[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function clearExpenses(): void {
  localStorage.removeItem(KEY)
}
