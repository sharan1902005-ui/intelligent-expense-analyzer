import { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import Charts from "./Charts";
import TransactionsTable from "./TransactionsTable";
import MonthlyBreakdown from "./MonthlyBreakdown";
import DataInput from "./DataInput";
import AIInsights from "./AIInsights";
import ExpenseChatBot from "./ExpenseChatBot";
import ExportReport from "./ExportReport";
import TrendChart from "./TrendChart";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import SettingsModal from "./SettingsModal";
import type { Transaction } from "../types";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "pink");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleImport = (newData: Transaction[]) => {
    setTransactions((prev) => {
      const updated = [...prev, ...newData];
      localStorage.setItem("transactions", JSON.stringify(updated));
      return updated;
    });
  };

  const filteredTransactions = transactions.filter((t) =>
    t.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (transactions.length === 0) {
    return (
      <>
        <div className={`min-h-screen md:flex ${
          theme === "pink"
            ? "bg-gradient-to-br from-pink-50 via-white to-rose-100"
            : theme === "lavender"
            ? "bg-gradient-to-br from-purple-50 via-white to-fuchsia-100"
            : "bg-gradient-to-br from-blue-50 via-white to-cyan-100"
        }`}>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 p-6 md:p-8 md:ml-0">
            <TopNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} transactions={transactions} onOpenSettings={() => setSettingsOpen(true)} />
            <div className="h-[70vh] flex items-center justify-center">
              <div className="bg-white/90 border border-pink-100 rounded-3xl shadow-xl p-12 text-center">
                <h2 className="text-3xl font-bold text-slate-800">No transactions yet</h2>
                <p className="text-gray-500 mt-4">Upload a PDF or CSV to begin analysis.</p>
                <div className="mt-8">
                  <DataInput onImport={handleImport} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} theme={theme} setTheme={setTheme} />
        <ExpenseChatBot transactions={transactions} />
      </>
    );
  }

  return (
    <>
      <div className={`min-h-screen md:flex ${
        theme === "pink"
          ? "bg-gradient-to-br from-pink-50 via-white to-rose-100"
          : theme === "lavender"
          ? "bg-gradient-to-br from-purple-50 via-white to-fuchsia-100"
          : "bg-gradient-to-br from-blue-50 via-white to-cyan-100"
      }`}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 p-6 md:p-8 md:ml-0 overflow-auto">
          <TopNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} transactions={transactions} onOpenSettings={() => setSettingsOpen(true)} />

          <div className="mt-8">
            <DataInput onImport={handleImport} />

            {activeTab === "Dashboard" && (
              <div className="space-y-6">
                <SummaryCards transactions={filteredTransactions} />
                <AIInsights transactions={filteredTransactions} />
              </div>
            )}

            {activeTab === "Analytics" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Charts transactions={filteredTransactions} />
                  <MonthlyBreakdown transactions={filteredTransactions} />
                </div>
                <TrendChart transactions={filteredTransactions} />
                <TransactionsTable transactions={filteredTransactions} />
              </div>
            )}

            {activeTab === "Reports" && (
              <div className="space-y-6">
                <div className="bg-white/90 backdrop-blur-2xl border border-pink-100 shadow-lg rounded-3xl p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Export Report</h3>
                  <ExportReport transactions={filteredTransactions} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} theme={theme} setTheme={setTheme} />
      <ExpenseChatBot transactions={transactions} />
    </>
  );
}
