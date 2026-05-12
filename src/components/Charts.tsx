import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

const COLORS = [
  "#ec4899",
  "#f472b6",
  "#fb7185",
  "#8b5cf6",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
];

export default function Charts({ transactions }: Props) {
  const expenses = transactions.filter((t) => t.type === "expense");

  const grouped = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(grouped).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-white/90 rounded-3xl shadow-lg p-6 border border-pink-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Category Distribution
      </h2>

      <p className="text-gray-500 mb-6">Where your money goes</p>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={90}
            outerRadius={140}
            paddingAngle={4}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip formatter={(value) => `₹${Number(value).toFixed(2)}`} />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
