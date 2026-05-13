import { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import Charts from "./Charts";
import TransactionsTable from "./TransactionsTable";
import MonthlyBreakdown from "./MonthlyBreakdown";
import DataInput from "./DataInput";
import AIInsights from "./AIInsights";
import ExpenseChatBot from "./ExpenseChatBot";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import SettingsModal from "./SettingsModal";
import QuickAddExpense from "./QuickAddExpense";
import BudgetProgress from "./BudgetProgress";
import type { Transaction } from "../types";
import jsPDF from "jspdf";

export default function Dashboard({ theme, setTheme }: { theme: string; setTheme: (t: string) => void }) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [budget, setBudget] = useState<number | "">(
    localStorage.getItem("budget")
      ? Number(localStorage.getItem("budget"))
      : ""
  );

  useEffect(() => {
    if (budget !== "") {
      localStorage.setItem("budget", budget.toString());
    }
  }, [budget]);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

const handleImport = (newData: Transaction[]) => {
    setTransactions((prev) => {
      const updated = [...prev, ...newData];
      localStorage.setItem("transactions", JSON.stringify(updated));
      return updated;
    });
  };

  const exportPdfReport = () => {
    const doc = new jsPDF();
    const expenses = transactions.filter((t) => t.type === "expense");
    const total = expenses.reduce((sum, t) => sum + t.amount, 0);
    doc.setFontSize(20);
    doc.text("Intelligent Expense Analyzer Report", 20, 20);
    doc.setFontSize(14);
    doc.text(`Total Spending: Rs.${total}`, 20, 40);
    let y = 60;
    expenses.forEach((tx) => {
      doc.text(`${tx.date} | ${tx.merchant} | Rs.${tx.amount} | ${tx.category}`, 20, y);
      y += 10;
      if (y > 270) { doc.addPage(); y = 20; }
    });
    doc.save("expense-report.pdf");
  };

  const CSVUploadCard = () => (
    <DataInput onImport={handleImport} mode="csv" />
  );

  const PDFUploadCard = () => (
    <DataInput onImport={handleImport} mode="pdf" />
  );

const filteredTransactions = transactions.filter((t) =>
    t.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.amount.toString().includes(searchQuery) ||
    t.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (transactions.length === 0) {
    return (
      <>
        <div className={`min-h-screen md:flex ${
          theme === "pink"
            ? "bg-gradient-to-br from-pink-50 via-white to-rose-100"
            : theme === "lavender"
            ? "bg-gradient-to-br from-purple-50 via-fuchsia-50 to-violet-100"
            : "bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-100"
        }`}>
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 p-6 md:p-8 md:ml-0">
            <TopNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} transactions={transactions} onOpenSettings={() => setSettingsOpen(true)} exportPdfReport={exportPdfReport} />
            <div className="mt-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Start tracking your expenses</h2>
                <p className="text-gray-500 mt-2">Upload statements or add expenses manually</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CSVUploadCard />
                <PDFUploadCard />
                <QuickAddExpense setTransactions={setTransactions} />
              </div>
            </div>
          </div>
        </div>
        <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} theme={theme} setTheme={setTheme} budget={budget} setBudget={setBudget} />
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
          ? "bg-gradient-to-br from-purple-50 via-fuchsia-50 to-violet-100"
          : "bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-100"
      }`}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 p-6 md:p-8 md:ml-0 overflow-auto">
          <TopNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} transactions={transactions} onOpenSettings={() => setSettingsOpen(true)} exportPdfReport={exportPdfReport} />

          <div className="mt-8">

            {activeTab === "Dashboard" && (
              <div className="space-y-8">

                {/* KPI */}
                <SummaryCards transactions={filteredTransactions} budget={budget === "" ? 0 : budget} />

                <BudgetProgress transactions={filteredTransactions} budget={budget === "" ? 0 : budget} />

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <CSVUploadCard />
                  <PDFUploadCard />
                  <QuickAddExpense setTransactions={setTransactions} />
                </div>

                {/* AI Card */}
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl shadow-xl p-8 text-white">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h2 className="text-3xl font-bold">AI Expense Assistant</h2>
                      <p className="text-pink-100 mt-2">Ask questions about your spending and get smart recommendations.</p>
                    </div>
                    <button
                      onClick={() => setChatOpen(true)}
                      className="bg-white text-pink-600 px-6 py-4 rounded-2xl font-semibold hover:scale-105 transition"
                    >
                      Open Assistant
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Analytics" && (
              <div className="space-y-8">
                <Charts transactions={filteredTransactions} />
                <MonthlyBreakdown transactions={filteredTransactions} />
                <AIInsights transactions={filteredTransactions} />
              </div>
            )}

            {activeTab === "Reports" && (
              <div className="space-y-8">
                <TransactionsTable transactions={filteredTransactions} setTransactions={setTransactions} />
              </div>
            )}
          </div>
        </div>
      </div>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} theme={theme} setTheme={setTheme} budget={budget} setBudget={setBudget} />
      <ExpenseChatBot transactions={transactions} defaultOpen={chatOpen} />
    </>
  );
}
