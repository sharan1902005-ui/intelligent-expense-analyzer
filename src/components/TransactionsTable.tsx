import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Transaction } from "../types";
import EditTransactionModal from "./EditTransactionModal";

interface Props {
  transactions: Transaction[];
  setTransactions: React.Dispatch<
    React.SetStateAction<Transaction[]>
  >;
}

export default function TransactionsTable({
  transactions,
  setTransactions,
}: Props) {
  const [editingIndex, setEditingIndex] =
    useState<number | null>(null);

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const handleDelete = (indexToDelete: number) => {
    setTransactions((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingTransaction({ ...transactions[index] });
  };

  const handleSaveEdit = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((tx, index) =>
        index === editingIndex ? updated : tx
      )
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Transactions
          </h2>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Recent spending activity
          </p>
        </div>

        <div className="text-sm px-4 py-2 rounded-2xl bg-pink-50 text-pink-600 font-medium w-fit">
          {transactions.length} records
        </div>
      </div>

      {/* Table */}
      <div className="max-h-[650px] overflow-y-auto overflow-x-auto rounded-2xl border border-pink-50">
        <table className="min-w-[850px] w-full">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-pink-100">
              <th className="text-left px-4 md:px-6 py-4 text-gray-500 font-semibold text-sm">
                Date
              </th>

              <th className="text-left px-4 md:px-6 py-4 text-gray-500 font-semibold text-sm">
                Merchant
              </th>

              <th className="text-left px-4 md:px-6 py-4 text-gray-500 font-semibold text-sm">
                Amount
              </th>

              <th className="text-left px-4 md:px-6 py-4 text-gray-500 font-semibold text-sm">
                Category
              </th>

              <th className="text-left px-4 md:px-6 py-4 text-gray-500 font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={index}
                className="hover:bg-pink-50 transition border-b border-pink-50"
              >
                <td className="px-4 md:px-6 py-4 text-slate-700 font-medium text-sm">
                  {tx.date}
                </td>

                <td className="px-4 md:px-6 py-4 text-slate-800 font-medium text-sm">
                  {tx.merchant
                    .toLowerCase()
                    .replace(/\b\w/g, (c) =>
                      c.toUpperCase()
                    )}
                </td>

                <td className="px-4 md:px-6 py-4 font-bold text-slate-800 text-sm">
                  ₹{tx.amount.toLocaleString()}
                </td>

                <td className="px-4 md:px-6 py-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
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

                <td className="px-4 md:px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-blue-50 text-blue-500 hover:bg-blue-100 transition"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(index)}
                      className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                    >
                      <Trash2 size={16} />
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
        onClose={() => {
          setEditingTransaction(null);
          setEditingIndex(null);
        }}
        transaction={editingTransaction}
        onSave={handleSaveEdit}
      />
    </div>
  );
}