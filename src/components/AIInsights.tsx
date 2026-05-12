import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

export default function AIInsights({ transactions }: Props) {
  const expenses = transactions.filter((t) => t.type === "expense");

  const totalSpent = expenses.reduce((sum, t) => sum + t.amount, 0);

  const categoryTotals: Record<string, number> = {};
  const merchantTotals: Record<string, number> = {};
  const monthlyTotals: Record<string, number> = {};

  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    merchantTotals[t.merchant] = (merchantTotals[t.merchant] || 0) + t.amount;

    const month = t.date.slice(0, 7);
    monthlyTotals[month] = (monthlyTotals[month] || 0) + t.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  const topMerchant = Object.entries(merchantTotals).sort((a, b) => b[1] - a[1])[0];
  const topMonth = Object.entries(monthlyTotals).sort((a, b) => b[1] - a[1])[0];

  const categoryPercent = topCategory
    ? ((topCategory[1] / totalSpent) * 100).toFixed(1)
    : 0;

  return (
    <div className="bg-white/90 backdrop-blur-2xl border border-pink-100 shadow-lg rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">AI Spending Insights</h2>

      <div className="space-y-4 text-gray-700">
        <p>
          💡 You spent <b>{categoryPercent}%</b> on <b>{topCategory?.[0]}</b>
        </p>

        <p>
          🏪 Top merchant: <b>{topMerchant?.[0]}</b>
        </p>

        <p>
          📅 Highest spending month: <b>{topMonth?.[0]}</b>
        </p>

        <p>
          📉 Suggestion: Reduce <b>{topCategory?.[0]}</b> spending by 15%
        </p>
      </div>
    </div>
  );
}
