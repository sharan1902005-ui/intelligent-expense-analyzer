import { useState } from "react";
import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

export default function BudgetAlerts({ transactions }: Props) {
  const [budget, setBudget] = useState(10000);

  const totalSpent = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const percent = budget > 0 ? (totalSpent / budget) * 100 : 0;

  const notifications = [];

  if (percent >= 80 && percent < 100) {
    notifications.push("⚠️ You have used 80% of your budget.");
  }

  if (percent >= 100) {
    notifications.push("🚨 Budget exceeded!");
  }

  notifications.push(`💰 Total spent: ₹${totalSpent}`);

  return (
    <div className="bg-white/90 backdrop-blur-2xl border border-pink-100 shadow-lg rounded-3xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Budget Alerts</h2>

      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        className="w-full border border-pink-200 rounded-2xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
        placeholder="Set monthly budget"
      />

      <div className="w-full h-4 bg-pink-100 rounded-full overflow-hidden">
        <div
          style={{ width: `${Math.min(percent, 100)}%` }}
          className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all"
        />
      </div>

      <div className="mt-6 space-y-2">
        {notifications.map((note, i) => (
          <div key={i} className="p-3 bg-pink-50 rounded-2xl text-slate-800">
            {note}
          </div>
        ))}
      </div>
    </div>
  );
}
