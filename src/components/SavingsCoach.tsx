import type { Transaction } from "../types";
import { PiggyBank, AlertTriangle, TrendingUp, CheckCircle, HeartPulse } from "lucide-react";

interface Props {
  transactions: Transaction[];
  budget?: number;
}

export default function SavingsCoach({ transactions, budget = 0 }: Props) {
  const expenses = transactions.filter(
    (t) => t.category !== "Income" && t.category !== "Transfer"
  );

  const totalSpent = expenses.reduce((sum, t) => sum + t.amount, 0);

  const foodSpent = expenses
    .filter((t) => t.category === "Food")
    .reduce((sum, t) => sum + t.amount, 0);

  const shoppingSpent = expenses
    .filter((t) => t.category === "Shopping")
    .reduce((sum, t) => sum + t.amount, 0);

  const transferSpent = transactions
    .filter((t) => t.category === "Transfer")
    .reduce((sum, t) => sum + t.amount, 0);

  const allSpent = totalSpent + transferSpent;
  const foodPercent = totalSpent > 0 ? (foodSpent / totalSpent) * 100 : 0;
  const transferPercent = allSpent > 0 ? (transferSpent / allSpent) * 100 : 0;
  const biggest = Math.max(...expenses.map((t) => t.amount), 0);

  let score = 100;

  if (budget > 0) {
    const usage = (totalSpent / budget) * 100;
    if (usage > 100) score -= 30;
    else if (usage > 85) score -= 15;
    else if (usage > 70) score -= 8;
  }

  if (foodPercent > 30) score -= 15;
  if (transferPercent > 50) score -= 25;
  else if (transferPercent > 35) score -= 12;
  if (shoppingSpent > totalSpent * 0.25) score -= 15;
  if (expenses.length > 40) score -= 10;
  if (biggest > totalSpent * 0.4) score -= 10;

  score = Math.min(Math.max(score, 35), 95);

  const tips = [];

  if (foodPercent > 30) {
    tips.push({
      icon: <PiggyBank size={20} />,
      title: "Food Spending Alert",
      message: `Cutting food expenses by 15% could save ₹${Math.round(foodSpent * 0.15).toLocaleString()}.`,
      color: "from-orange-400 to-pink-500",
    });
  }

  if (budget > 0 && totalSpent > budget) {
    tips.push({
      icon: <AlertTriangle size={20} />,
      title: "Budget Warning",
      message: `You exceeded your budget by ₹${(totalSpent - budget).toLocaleString()}.`,
      color: "from-red-500 to-pink-500",
    });
  }

  if (transferPercent > 35) {
    tips.push({
      icon: <TrendingUp size={20} />,
      title: "High Transfer Activity",
      message: `Transfers make up ${Math.round(transferPercent)}% of spending. Review frequent transfers.`,
      color: "from-purple-500 to-pink-500",
    });
  }

  if (shoppingSpent > totalSpent * 0.25) {
    tips.push({
      icon: <TrendingUp size={20} />,
      title: "Shopping Spike",
      message: `Shopping is unusually high this month.`,
      color: "from-blue-500 to-cyan-500",
    });
  }

  if (tips.length === 0) {
    tips.push({
      icon: <CheckCircle size={20} />,
      title: "Great Spending Discipline",
      message: "Your spending pattern looks healthy and controlled.",
      color: "from-green-500 to-emerald-500",
    });
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8">
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Financial Health Dashboard</h2>
          <p className="text-gray-500 mt-2">AI-powered recommendations to optimize spending.</p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-6 rounded-3xl shadow-lg min-w-[240px]">
          <div className="flex items-center gap-3">
            <HeartPulse size={26} />
            <div>
              <p className="text-sm opacity-90">Financial Health Score</p>
              <h3 className="text-4xl font-bold">{score}/100</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${tip.color} rounded-3xl p-6 text-white shadow-lg`}
          >
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-2xl">{tip.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{tip.title}</h3>
                <p className="text-white/90 mt-2">{tip.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
