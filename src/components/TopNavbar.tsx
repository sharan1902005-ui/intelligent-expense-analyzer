import {
  Bell,
  Search,
  Settings,
  Download,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import type { Transaction } from "../types";

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  transactions: Transaction[];
  budget: number;
  onOpenSettings: () => void;
  exportPdfReport: () => void;
}

export default function TopNavbar({
  searchQuery,
  setSearchQuery,
  transactions,
  budget,
  onOpenSettings,
  exportPdfReport,
}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const totalSpent = transactions
    .filter((t) => t.category !== "Income" && t.category !== "Transfer")
    .reduce((sum, t) => sum + t.amount, 0);

  const foodSpent = transactions
    .filter((t) => t.category === "Food")
    .reduce((sum, t) => sum + t.amount, 0);

  const notifications: string[] = [];

  if (budget > 0 && totalSpent > budget * 0.8) {
    notifications.push(`Budget usage at ${Math.round((totalSpent / budget) * 100)}%`);
  }

  if (foodSpent > totalSpent * 0.3 && totalSpent > 0) {
    notifications.push("High food spending detected");
  }

  if (transactions.length > 0) {
    notifications.push(`${transactions.length} transactions loaded`);
  }

  if (notifications.length === 0) {
    notifications.push("Everything looks healthy");
  }

  return (
    <header className="bg-white/80 backdrop-blur-2xl border border-pink-100 rounded-3xl shadow-xl px-4 md:px-8 py-5">
      <div className="flex flex-col gap-5">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          {/* Welcome */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Welcome back 👋
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              {transactions.length > 0
                ? `${transactions.length} transactions loaded`
                : "Track your finances smarter"}
            </p>
          </div>

          {/* Right controls */}
          <div className="flex items-center justify-between md:justify-end gap-3">

            {/* Notification */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-3 md:p-4 rounded-2xl bg-pink-50 border border-pink-100 hover:bg-pink-100 transition"
              >
                <Bell size={20} className="text-pink-500" />
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {notifications.length}
                </span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-16 bg-white rounded-3xl shadow-2xl border border-pink-100 p-3 w-80 max-w-[90vw] z-50">
                  <h3 className="font-bold text-slate-800 px-3 py-2">Notifications</h3>
                  {notifications.map((note, index) => (
                    <div key={index} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-pink-50">
                      <AlertCircle size={18} className="text-pink-500" />
                      <span className="text-slate-700 text-sm">{note}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <div
                className="flex items-center gap-3 bg-white border border-pink-100 rounded-2xl px-3 md:px-4 py-3 shadow-sm cursor-pointer"
                onClick={() =>
                  setDropdownOpen(!dropdownOpen)
                }
              >
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold">
                  S
                </div>

                <div className="hidden lg:block">
                  <p className="font-semibold text-slate-800">
                    Smart User
                  </p>
                  <p className="text-xs text-gray-500">
                    Premium Plan
                  </p>
                </div>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 top-16 bg-white rounded-3xl shadow-2xl border border-pink-100 p-3 w-64 max-w-[90vw] z-50">
                  <button
                    onClick={() => {
                      onOpenSettings();
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-pink-50 transition text-slate-700"
                  >
                    <Settings size={18} />
                    Settings
                  </button>

                  <button
                    onClick={() => {
                      exportPdfReport();
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-pink-50 transition text-slate-700"
                  >
                    <Download size={18} />
                    Export PDF Report
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 transition text-red-500">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 w-full">
          <Search size={20} className="text-pink-400" />

          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="bg-transparent outline-none w-full text-slate-700"
          />
        </div>
      </div>
    </header>
  );
}