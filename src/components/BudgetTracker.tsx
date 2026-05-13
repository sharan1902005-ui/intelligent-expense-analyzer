import type { Transaction } from "../types";
import { Wallet } from "lucide-react";

interface Props {
  transactions: Transaction[];
  budget?: number;
}

export default function BudgetTracker({ transactions, budget = 0 }: Props) {
  const now = new Date();

  const monthlySpent = transactions
    .filter((t) => {
      const date = new Date(t.date);
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear() &&
        t.category !== "Income" &&
        t.category !== "Transfer"
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const percent = budget > 0 ? Math.min((monthlySpent / budget) * 100, 100) : 0;

  const getColor = () => {
    if (percent < 70) return "from-green-500 to-emerald-500";
    if (percent < 90) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getStatus = () => {
    if (budget === 0) return "Set a monthly budget in settings";
    if (percent < 70) return "Budget is under control";
    if (percent < 90) return "Approaching your budget limit";
    return "Budget almost exhausted";
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-pink-100 p-4 rounded-2xl">
          <Wallet className="text-pink-500" size={26} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Monthly Budget Tracker</h2>
          <p className="text-gray-500">Monitor your spending progress</p>
        </div>
      </div>

      {budget === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-6 text-center">
          <p className="text-gray-600 font-medium">
            Set a monthly budget in Settings to activate this feature.
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-500">Spent this month</p>
              <h3 className="text-4xl font-bold text-slate-800">
                ₹{monthlySpent.toLocaleString()}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Budget</p>
              <h3 className="text-3xl font-bold text-pink-600">
                ₹{budget.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden mb-5">
            <div
              className={`h-full bg-gradient-to-r ${getColor()} rounded-full transition-all duration-700`}
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">{getStatus()}</p>
            <span className="text-xl font-bold text-slate-800">{Math.round(percent)}%</span>
          </div>
        </>
      )}
    </div>
  );
}
