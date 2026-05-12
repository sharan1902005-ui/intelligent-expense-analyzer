import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
  budget?: number;
}

export default function SummaryCards({ transactions, budget = 0 }: Props) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const totalSpent = expenses.reduce((sum, t) => sum + t.amount, 0);

  const categoryTotals: Record<string, number> = {};
  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const topCategory =
    Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  const highestExpense = Math.max(...expenses.map((t) => t.amount), 0);

  const cards = [
    { title: "Total Spent", value: totalSpent, prefix: "₹" },
    { title: "Highest Expense", value: highestExpense, prefix: "₹" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white/90 backdrop-blur-2xl border border-pink-100 shadow-lg rounded-3xl p-6"
        >
          <h3 className="text-gray-500">{card.title}</h3>
          <p className="text-3xl font-bold text-pink-600 mt-4">
            {card.prefix}{card.value.toLocaleString()}
          </p>
        </div>
      ))}

      <div className="bg-white/90 backdrop-blur-2xl border border-pink-100 shadow-lg rounded-3xl p-6">
        <h3 className="text-gray-500">Top Category</h3>
        <p className="text-3xl font-bold text-pink-600 mt-4">{topCategory}</p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-pink-100 p-6">
        <p className="text-gray-500">Monthly Budget</p>
        <h2 className="text-3xl font-bold text-purple-600 mt-2">
          ₹{budget.toLocaleString()}
        </h2>
      </div>
    </div>
  );
}
