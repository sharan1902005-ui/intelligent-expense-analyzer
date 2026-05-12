import { Bell, Search } from "lucide-react";
import { useState } from "react";
import NotificationPanel from "./NotificationPanel";
import type { Transaction } from "../types";

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  transactions: Transaction[];
  onOpenSettings: () => void;
}

export default function TopNavbar({ searchQuery, setSearchQuery, transactions, onOpenSettings }: Props) {
  const [showNotifications, setShowNotifications] = useState(false);

  const expenses = transactions.filter((t) => t.type === "expense");
  const totalSpent = expenses.reduce((sum, t) => sum + t.amount, 0);
  const topExpense = [...expenses].sort((a, b) => b.amount - a.amount)[0];

  const notifications = [
    totalSpent > 10000 ? "🚨 Budget warning: Spending exceeded ₹10,000" : "",
    topExpense ? `💸 Largest expense: ₹${topExpense.amount} at ${topExpense.merchant}` : "",
    "📥 Recent transactions imported successfully",
  ].filter(Boolean);

  return (
    <div className="relative bg-white/90 backdrop-blur-2xl border border-pink-100 rounded-3xl shadow-lg px-8 py-5 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Welcome back 👋</h2>
        <p className="text-gray-500 mt-1">Track your finances smarter</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center bg-pink-50 border border-pink-100 rounded-2xl px-4 py-3 w-80">
          <Search size={18} className="text-pink-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transactions..."
            className="bg-transparent outline-none ml-3 w-full"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="bg-pink-50 border border-pink-100 p-4 rounded-2xl"
          >
            <Bell className="text-pink-500" size={20} />
          </button>

          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
            {notifications.length}
          </span>

          {showNotifications && <NotificationPanel notifications={notifications} />}
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("transactions");
            window.location.reload();
          }}
          className="bg-red-50 border border-red-100 px-5 py-3 rounded-2xl text-red-500 hover:bg-red-100"
        >
          Clear All
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSettings}
            className="p-4 rounded-2xl border border-pink-100 bg-pink-50 hover:bg-pink-100"
          >
            ⚙️
          </button>

          <div className="flex items-center gap-3 bg-pink-50 border border-pink-100 rounded-2xl px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold">
              S
            </div>

            <div>
              <p className="font-semibold text-slate-800">Smart User</p>
              <p className="text-xs text-gray-500">Premium User</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
