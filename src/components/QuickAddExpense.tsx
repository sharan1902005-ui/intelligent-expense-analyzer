import { useState } from "react";
import { PlusCircle } from "lucide-react";
import type { Transaction, Category } from "../types";

interface Props {
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export default function QuickAddExpense({ setTransactions }: Props) {
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleAdd = () => {
    if (!merchant || !amount) return;

    const newExpense: Transaction = {
      id: crypto.randomUUID(),
      merchant,
      amount: Number(amount),
      category,
      date,
      type: "expense",
    };

    setTransactions((prev) => [newExpense, ...prev]);
    setMerchant("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-pink-100 p-7 h-auto">
      <div className="flex items-center gap-3 mb-6">
        <PlusCircle className="text-pink-500" />
        <h2 className="text-2xl font-bold text-slate-800">Quick Add Expense</h2>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Merchant (e.g. Swiggy)"
          value={merchant}
          onChange={(e) => setMerchant(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl border border-pink-100 bg-white outline-none focus:ring-2 focus:ring-pink-300"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl border border-pink-100 bg-white outline-none focus:ring-2 focus:ring-pink-300"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full px-5 py-3 rounded-2xl border border-pink-100 bg-white outline-none"
        >
          <option>Food</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Travel</option>
          <option>Subscription</option>
          <option>Transfer</option>
          <option>Income</option>
          <option>Others</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl border border-pink-100 bg-white outline-none"
        />

        <button
          type="button"
          onClick={handleAdd}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3.5 rounded-2xl font-semibold hover:scale-[1.02] transition"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}
