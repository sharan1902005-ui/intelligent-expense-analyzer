import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

export default function MonthlyBreakdown({ transactions }: Props) {
  const grouped = transactions.reduce((acc, tx) => {
    if (tx.type !== "expense") return acc;

    const date = new Date(tx.date);
    const monthKey = date.toLocaleString("en-IN", {
      month: "short",
      year: "numeric",
    });

    acc[monthKey] = (acc[monthKey] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(grouped);
  const max = Math.max(...data.map(([, v]) => v), 1);

  return (
    <div className="bg-white/90 rounded-3xl shadow-lg p-6 border border-pink-100">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        Monthly Breakdown
      </h2>

      <div className="space-y-4">
        {data.map(([month, amount]) => (
          <div key={month}>
            <div className="flex justify-between mb-2">
              <span className="font-medium">{month}</span>
              <span className="text-pink-600 font-bold">
                ₹{amount.toFixed(2)}
              </span>
            </div>

            <div className="w-full bg-pink-100 rounded-full h-3">
              <div
                className="bg-pink-500 h-3 rounded-full"
                style={{ width: `${(amount / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
