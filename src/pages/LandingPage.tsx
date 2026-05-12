import { Wallet, Brain, TrendingUp, Bell, FileText, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import ThemeSwitcher from "../components/ThemeSwitcher";
import PageTransition from "../components/PageTransition";

const bgThemes = {
  lavender: "bg-gradient-to-br from-pink-50 via-white to-rose-100",
  pink: "bg-gradient-to-br from-pink-50 via-white to-rose-100",
  blue: "bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-100",
  dark: "bg-gradient-to-br from-slate-900 to-slate-800",
};

export default function LandingPage() {
  const { theme } = useThemeContext();
  const features = [
    { icon: <Wallet size={28} />, title: "Smart Expense Tracking", desc: "Upload PDF or CSV statements and analyze spending instantly." },
    { icon: <Brain size={28} />, title: "AI Insights", desc: "Get smart financial suggestions based on your spending habits." },
    { icon: <TrendingUp size={28} />, title: "Analytics Dashboard", desc: "Visual charts, category breakdowns, and monthly trends." },
    { icon: <Bell size={28} />, title: "Budget Alerts", desc: "Stay on top of overspending with smart notifications." },
    { icon: <FileText size={28} />, title: "PDF Reports", desc: "Export beautiful expense reports anytime." },
    { icon: <Shield size={28} />, title: "Private & Secure", desc: "All data stored locally in your browser." },
  ];

  return (
    <PageTransition>
      <div className={`min-h-screen ${bgThemes[theme]}`}>
        <nav className="flex justify-between items-center px-10 py-6">
          <h1 className="text-3xl font-bold text-pink-600">SmartSpend AI</h1>

          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-2xl shadow-md hover:scale-105 transition"
            >
              Enter App
            </Link>
          </div>
        </nav>

        <section className="text-center px-6 py-20">
          <h2 className="text-3xl md:text-6xl font-bold text-slate-800 leading-tight">
            Your Intelligent
            <span className="bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
              {" "}Expense Analyzer
            </span>
          </h2>

          <p className="mt-6 text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            Track expenses, analyze spending habits, get AI insights, manage
            budgets, and export reports — all in one beautiful app.
          </p>

          <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition"
            >
              Get Started
            </Link>

            <button className="bg-white/80 backdrop-blur-lg px-8 py-4 rounded-2xl border border-pink-100 shadow-md">
              View Features
            </button>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h3 className="text-4xl font-bold text-center text-slate-800 mb-14">
            Premium Features
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white/90 backdrop-blur-2xl border border-pink-100 shadow-lg rounded-3xl p-8 hover:-translate-y-2 hover:shadow-2xl transition"
              >
                <div className="text-pink-500 mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold text-slate-800">{feature.title}</h4>
                <p className="text-gray-600 mt-3">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
