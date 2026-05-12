import type { Transaction } from "../types";

const STORAGE_KEY = "expense_transactions";

export function saveTransactions(data: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadTransactions(): Transaction[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function clearTransactions() {
  localStorage.removeItem(STORAGE_KEY);
}
