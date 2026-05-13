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
import SavingsCoach from "./SavingsCoach";
import TopInsights from "./TopInsights";
import BudgetTracker from "./BudgetTracker";
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

const loadDemoData = () => {
  const demoTransactions: Transaction[] = [
    { id: crypto.randomUUID(), date: "2026-05-01", merchant: "Swiggy", amount: 320, category: "Food", type: "expense" },
    { id: crypto.randomUUID(), date: "2026-05-02", merchant: "Uber", amount: 180, category: "Travel", type: "expense" },
    { id: crypto.randomUUID(), date: "2026-05-03", merchant: "Netflix", amount: 649, category: "Subscription", type: "expense" },
    { id: crypto.randomUUID(), date: "2026-05-04", merchant: "Amazon", amount: 1499, category: "Shopping", type: "expense" },
    { id: crypto.randomUUID(), date: "2026-05-05", merchant: "Salary", amount: 25000, category: "Income", type: "income" },
    { id: crypto.randomUUID(), date: "2026-05-06", merchant: "Electricity Board", amount: 1200, category: "Bills", type: "expense" },
    { id: crypto.randomUUID(), date: "2026-05-07", merchant: "Zomato", amount: 450, category: "Food", type: "expense" },
    { id: crypto.randomUUID(), date: "2026-05-08", merchant: "Spotify", amount: 119, category: "Subscription", type: "expense" },
  ];
  setTransactions(demoTransactions);
};

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
            <TopNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} transactions={transactions} budget={Number(budget) || 0} onOpenSettings={() => setSettingsOpen(true)} exportPdfReport={exportPdfReport} />
            <div className="mt-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Start tracking your expenses</h2>
                <p className="text-gray-500 mt-2">Upload statements or add expenses manually</p>
                <button
                  onClick={loadDemoData}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg hover:scale-105 transition mt-4"
                >
                  Try Demo Data
                </button>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
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
          <TopNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} transactions={transactions} budget={Number(budget) || 0} onOpenSettings={() => setSettingsOpen(true)} exportPdfReport={exportPdfReport} />

          <div className="mt-6">

            {activeTab === "Dashboard" && (
              <div className="space-y-8">

                {/* KPI */}
                <SummaryCards transactions={filteredTransactions} budget={budget === "" ? 0 : budget} />

                <BudgetProgress transactions={filteredTransactions} budget={budget === "" ? 0 : budget} />

                {/* Main Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
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
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <Charts transactions={filteredTransactions} />
                  <MonthlyBreakdown transactions={filteredTransactions} />
                </div>
                <TopInsights transactions={filteredTransactions} />
                <BudgetTracker
                  transactions={filteredTransactions}
                  budget={Number(budget) || 0}
                />
                <AIInsights transactions={filteredTransactions} />
                <SavingsCoach
                  transactions={filteredTransactions}
                  budget={Number(budget) || 0}
                />
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
      <ExpenseChatBot transactions={transactions} isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
