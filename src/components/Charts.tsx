import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Transaction } from "../types";

const COLORS = [
  "#ec4899",
  "#f472b6",
  "#fb7185",
  "#c084fc",
  "#60a5fa",
  "#34d399",
];

function ExpensePieChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  const filteredData = data.filter((item) => item.value > 0);

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-pink-100 p-6">
      <h2 className="text-3xl font-bold text-slate-800">
        Category Distribution
      </h2>

      <p className="text-gray-500 mt-1">Where your money goes</p>

      <div className="h-[420px] mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="45%"
              innerRadius={90}
              outerRadius={130}
              paddingAngle={4}
              dataKey="value"
              cornerRadius={10}
            >
              {filteredData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number) =>
                `₹${Number(value).toLocaleString()}`
              }
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid #fbcfe8",
              }}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{
                paddingTop: 20,
                fontSize: "14px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function Charts({ transactions }: { transactions: Transaction[] }) {
  const expenses = transactions.filter((t) => t.type === "expense");

  const grouped = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(grouped).map(([name, value]) => ({ name, value }));

  return <ExpensePieChart data={data} />;
}
