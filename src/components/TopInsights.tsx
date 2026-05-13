import type { Transaction } from "../types";
import { Crown, TrendingUp } from "lucide-react";

interface Props {
  transactions: Transaction[];
}

export default function TopInsights({ transactions }: Props) {
  const expenses = transactions.filter(
    (t) => t.category !== "Income" && t.category !== "Transfer"
  );

  const merchantTotals = expenses.reduce((acc, tx) => {
    acc[tx.merchant] = (acc[tx.merchant] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const topMerchants = Object.entries(merchantTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const biggestExpenses = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

      {/* Top Merchants */}
      <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Crown className="text-pink-500" />
          <h2 className="text-2xl font-bold text-slate-800">Top Merchants</h2>
        </div>

        <div className="space-y-4">
          {topMerchants.map(([merchant, amount], index) => (
            <div
              key={merchant}
              className="flex justify-between items-center bg-pink-50 rounded-2xl px-5 py-4"
            >
              <p className="font-semibold text-slate-800">
                #{index + 1}{" "}
                {merchant.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
              </p>
              <p className="font-bold text-pink-600">₹{amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Biggest Expenses */}
      <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="text-pink-500" />
          <h2 className="text-2xl font-bold text-slate-800">Biggest Expenses</h2>
        </div>

        <div className="space-y-4">
          {biggestExpenses.map((tx, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-purple-50 rounded-2xl px-5 py-4"
            >
              <div>
                <p className="font-semibold text-slate-800">
                  {tx.merchant.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
                <p className="text-sm text-gray-500">{tx.category}</p>
              </div>
              <p className="font-bold text-purple-600">₹{tx.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
