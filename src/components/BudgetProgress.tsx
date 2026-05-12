import { Wallet } from "lucide-react";
import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
  budget: number | "";
}

export default function BudgetProgress({ transactions, budget }: Props) {
  const totalSpent = transactions
    .filter((t) => t.category !== "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  if (!budget || budget <= 0) return null;

  const percentage = Math.min((totalSpent / budget) * 100, 100);
  const remaining = budget - totalSpent;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
      <div className="flex items-center gap-3 mb-6">
        <Wallet className="text-pink-500" />
        <h2 className="text-2xl font-bold text-slate-800">Monthly Budget</h2>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>₹{totalSpent.toLocaleString()} spent</span>
          <span>₹{Number(budget).toLocaleString()} budget</span>
        </div>

        <div className="w-full h-4 bg-pink-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage > 90
                ? "bg-red-500"
                : percentage > 70
                ? "bg-orange-400"
                : "bg-pink-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="mt-4">
        {remaining >= 0 ? (
          <p className="text-green-600 font-medium">
            ₹{remaining.toLocaleString()} remaining
          </p>
        ) : (
          <p className="text-red-500 font-medium">
            Budget exceeded by ₹{Math.abs(remaining).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
