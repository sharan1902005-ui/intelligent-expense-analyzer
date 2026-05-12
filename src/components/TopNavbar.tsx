import { Bell, Search, Settings, Download } from "lucide-react";
import { useState } from "react";
import type { Transaction } from "../types";

interface Props {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  transactions: Transaction[];
  onOpenSettings: () => void;
  exportPdfReport: () => void;
}

export default function TopNavbar({
  searchQuery,
  setSearchQuery,
  transactions,
  onOpenSettings,
  exportPdfReport,
}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <header className="bg-white/80 backdrop-blur-2xl border border-pink-100 rounded-3xl shadow-xl px-6 md:px-8 py-5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">

        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome back 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Track your finances smarter
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 w-full md:w-auto">

          {/* Search */}
          <div className="hidden md:flex items-center gap-3 bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 w-[420px]">
            <Search size={20} className="text-pink-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-slate-700"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-4 rounded-2xl bg-pink-50 border border-pink-100 hover:bg-pink-100 transition">
            <Bell size={20} className="text-pink-500" />
            {transactions.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                {transactions.length > 9 ? "9+" : transactions.length}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="relative">
            <div
              className="flex items-center gap-3 bg-white border border-pink-100 rounded-2xl px-4 py-3 shadow-sm cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold">
                S
              </div>
              <div className="hidden md:block">
                <p className="font-semibold text-slate-800">Smart User</p>
                <p className="text-xs text-gray-500">Premium Plan</p>
              </div>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 top-16 bg-white rounded-3xl shadow-2xl border border-pink-100 p-3 w-64 z-50">
                <button
                  onClick={() => { onOpenSettings(); setDropdownOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-pink-50 transition text-slate-700"
                >
                  <Settings size={18} />
                  Settings
                </button>

                <button
                  onClick={() => { exportPdfReport(); setDropdownOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-pink-50 transition text-slate-700"
                >
                  <Download size={18} />
                  Export PDF Report
                </button>

                <button
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 transition text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
