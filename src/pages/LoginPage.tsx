import { useState } from "react";
import { Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";

export default function LoginPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleEnter = () => {
    if (!name.trim()) return;
    localStorage.setItem("username", name);
    navigate("/");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-100 flex items-center justify-center px-6">
        <div className="bg-white/90 backdrop-blur-2xl border border-pink-100 rounded-3xl shadow-2xl p-10 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center shadow-xl">
              <Wallet size={36} className="text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-slate-800">
            Welcome to SmartSpend AI
          </h1>

          <p className="text-gray-500 text-center mt-3">
            Your intelligent expense companion
          </p>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEnter()}
            placeholder="Enter your name"
            className="w-full mt-8 border border-pink-200 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <button
            onClick={handleEnter}
            className="w-full mt-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            Enter SmartSpend
          </button>
        </div>
      </div>
    </PageTransition>
  );
}
