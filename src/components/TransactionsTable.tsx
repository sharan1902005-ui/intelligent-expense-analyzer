import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Transaction } from "../types";
import EditTransactionModal from "./EditTransactionModal";

interface Props {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export default function TransactionsTable({ transactions, setTransactions }: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleDelete = (indexToDelete: number) => {
    setTransactions((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingTransaction({ ...transactions[index] });
  };

  const handleSaveEdit = (updated: Transaction) => {
    setEditingTransaction(updated);
    setTransactions((prev) =>
      prev.map((tx, index) => (index === editingIndex ? updated : tx))
    );
  };
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Transactions</h2>
          <p className="text-gray-500 mt-1">Recent spending activity</p>
        </div>

        <div className="text-sm px-4 py-2 rounded-2xl bg-pink-50 text-pink-600 font-medium">
          {transactions.length} records
        </div>
      </div>

      <div className="max-h-[650px] overflow-y-auto rounded-2xl border border-pink-50">
        <table className="w-full">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-pink-100">
              <th className="text-left px-6 py-5 text-gray-500 font-semibold">Date</th>
              <th className="text-left px-6 py-5 text-gray-500 font-semibold">Merchant</th>
              <th className="text-left px-6 py-5 text-gray-500 font-semibold">Amount</th>
              <th className="text-left px-6 py-5 text-gray-500 font-semibold">Category</th>
              <th className="text-left px-6 py-5 text-gray-500 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={index}
                className="hover:bg-pink-50 transition border-b border-pink-50"
              >
                <td className="px-6 py-5 text-slate-700 font-medium">{tx.date}</td>

                <td className="px-6 py-5 text-slate-800 font-medium">
                  {tx.merchant.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                </td>

                <td className="px-6 py-5 font-bold text-slate-800">
                  ₹{tx.amount.toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      tx.category === "Food"
                        ? "bg-orange-100 text-orange-600"
                        : tx.category === "Shopping"
                        ? "bg-blue-100 text-blue-600"
                        : tx.category === "Bills"
                        ? "bg-purple-100 text-purple-600"
                        : tx.category === "Transfer"
                        ? "bg-pink-100 text-pink-600"
                        : tx.category === "Income"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tx.category}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="p-3 rounded-2xl bg-blue-50 text-blue-500 hover:bg-blue-100 transition"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(index)}
                      className="p-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditTransactionModal
        open={editingTransaction !== null}
        onClose={() => { setEditingTransaction(null); setEditingIndex(null); }}
        transaction={editingTransaction}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
