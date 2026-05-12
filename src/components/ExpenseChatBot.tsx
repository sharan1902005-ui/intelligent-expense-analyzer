import { useState } from "react";
import { Bot, User, X, MessageCircle } from "lucide-react";
import type { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
}

interface Message {
  sender: "bot" | "user";
  text: string;
}

export default function ExpenseChatBot({ transactions }: Props) {
  const username = localStorage.getItem("username") || "there";
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: `Hi ${username} 👋 I'm your SmartSpend AI assistant. Ask about your spending.` },
  ]);

  const expenses = transactions.filter((t) => t.type === "expense");
  const totalSpent = expenses.reduce((sum, t) => sum + t.amount, 0);
  const topExpense = [...expenses].sort((a, b) => b.amount - a.amount)[0];

  const categoryTotals = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  const merchantTotals = expenses.reduce((acc, tx) => {
    acc[tx.merchant] = (acc[tx.merchant] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const topMerchant = Object.entries(merchantTotals).sort((a, b) => b[1] - a[1])[0];

  const askQuestion = (type: string) => {
    let userText = "";
    let answer = "No data found.";

    switch (type) {
      case "total":
        userText = "What is my total spending?";
        answer = `Your total spending is ₹${totalSpent.toFixed(2)}`;
        break;
      case "category":
        userText = "What is my top category?";
        answer = topCategory
          ? `Your top category is ${topCategory[0]} with ₹${topCategory[1].toFixed(2)} spent.`
          : "No category data found.";
        break;
      case "highest":
        userText = "What is my highest expense?";
        answer = topExpense
          ? `Highest expense is ₹${topExpense.amount} at ${topExpense.merchant}.`
          : "No expenses found.";
        break;
      case "merchant":
        userText = "Who is my top merchant?";
        answer = topMerchant
          ? `Top merchant is ${topMerchant[0]} with ₹${topMerchant[1].toFixed(2)} spent.`
          : "No merchant data found.";
        break;
      case "recent":
        userText = "Show recent transactions";
        answer =
          expenses.length > 0
            ? "Recent: " + [...expenses]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 3)
                .map((t) => `${t.merchant} ₹${t.amount}`)
                .join(", ")
            : "No recent transactions.";
        break;
    }

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText },
      { sender: "bot", text: answer },
    ]);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-8 z-[9999] w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-2xl flex items-center justify-center text-white hover:scale-110 transition"
      >
        {open ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {open && (
        <div className="fixed bottom-28 right-8 z-[9999] w-[420px] h-[600px] bg-white rounded-3xl shadow-2xl border border-pink-100 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-5">
            <h2 className="text-xl font-bold">SmartSpend AI 🤖</h2>
            <p className="text-sm opacity-90">Your finance assistant</p>
          </div>

          <div className="p-4 flex flex-wrap gap-2 border-b bg-white">
            <button onClick={() => askQuestion("total")} className="px-3 py-2 bg-pink-100 rounded-full text-sm hover:bg-pink-200">
              💸 Total
            </button>
            <button onClick={() => askQuestion("category")} className="px-3 py-2 bg-pink-100 rounded-full text-sm hover:bg-pink-200">
              📊 Category
            </button>
            <button onClick={() => askQuestion("highest")} className="px-3 py-2 bg-pink-100 rounded-full text-sm hover:bg-pink-200">
              🚨 Highest
            </button>
            <button onClick={() => askQuestion("merchant")} className="px-3 py-2 bg-pink-100 rounded-full text-sm hover:bg-pink-200">
              👤 Merchant
            </button>
            <button onClick={() => askQuestion("recent")} className="px-3 py-2 bg-pink-100 rounded-full text-sm hover:bg-pink-200">
              🧾 Recent
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-pink-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${msg.sender === "user" ? "bg-pink-500 text-white" : "bg-white shadow"}`}>
                  <div className="flex gap-2 items-start">
                    {msg.sender === "bot" ? <Bot size={16} /> : <User size={16} />}
                    <span>{msg.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
