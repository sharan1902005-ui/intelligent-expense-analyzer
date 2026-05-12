import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

export default function TrendChart({ transactions }: Props) {
  const monthly: Record<string, number> = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const month = t.date.slice(0, 7);
      monthly[month] = (monthly[month] || 0) + t.amount;
    });

  const data = Object.entries(monthly)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, amount]) => ({ month, amount }));

  return (
    <div className="bg-white/90 backdrop-blur-2xl border border-pink-100 shadow-lg rounded-3xl p-6 h-[400px]">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Spending Trend</h2>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center mt-16">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
