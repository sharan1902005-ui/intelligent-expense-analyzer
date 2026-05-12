import type { Transaction, Category } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onSave: (updated: Transaction) => void;
}

export default function EditTransactionModal({
  open,
  onClose,
  transaction,
  onSave,
}: Props) {
  if (!open || !transaction) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Edit Transaction
        </h2>

        <div className="space-y-4">
          <input
            value={transaction.merchant}
            onChange={(e) => onSave({ ...transaction, merchant: e.target.value })}
            className="w-full px-5 py-4 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
          />

          <input
            type="number"
            value={transaction.amount}
            onChange={(e) => onSave({ ...transaction, amount: Number(e.target.value) })}
            className="w-full px-5 py-4 rounded-2xl border border-pink-100 outline-none focus:ring-2 focus:ring-pink-300"
          />

          <select
            value={transaction.category}
            onChange={(e) => onSave({ ...transaction, category: e.target.value as Category })}
            className="w-full px-5 py-4 rounded-2xl border border-pink-100 outline-none"
          >
            <option>Food</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Travel</option>
            <option>Subscription</option>
            <option>Transfer</option>
            <option>Income</option>
            <option>Others</option>
          </select>

          <input
            type="date"
            value={transaction.date}
            onChange={(e) => onSave({ ...transaction, date: e.target.value })}
            className="w-full px-5 py-4 rounded-2xl border border-pink-100 outline-none"
          />
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl bg-gray-100 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
