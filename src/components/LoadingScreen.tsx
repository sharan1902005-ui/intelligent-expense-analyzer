import { Wallet } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-white to-rose-100 flex flex-col items-center justify-center z-50">
      {/* Animated logo */}
      <div className="w-28 h-28 rounded-3xl bg-gradient-to-r from-pink-500 to-rose-500 shadow-2xl flex items-center justify-center animate-bounce">
        <Wallet size={48} className="text-white" />
      </div>

      <h1 className="mt-8 text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
        SmartSpend AI
      </h1>

      <p className="mt-4 text-gray-500 text-lg">
        Loading your financial intelligence...
      </p>

      {/* loading dots */}
      <div className="flex gap-3 mt-8">
        <div className="w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-pink-500 rounded-full animate-pulse delay-150"></div>
        <div className="w-4 h-4 bg-pink-600 rounded-full animate-pulse delay-300"></div>
      </div>
    </div>
  );
}
