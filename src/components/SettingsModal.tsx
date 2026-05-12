import {
  X,
  Trash2,
  Palette,
  Wallet,
  Sparkles,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export default function SettingsModal({
  open,
  onClose,
  theme,
  setTheme,
}: Props) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-md z-50"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full md:w-[460px] bg-white/95 backdrop-blur-3xl shadow-2xl z-50 border-l border-pink-100 p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold text-slate-800">
              Settings
            </h2>
            <p className="text-gray-500 mt-2">
              Personalize your SmartSpend experience
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-3 rounded-2xl hover:bg-pink-50 transition"
          >
            <X size={28} />
          </button>
        </div>

        {/* Theme */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 rounded-3xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 rounded-2xl bg-white shadow-sm">
              <Palette className="text-pink-500" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-800">
                Theme
              </h3>
              <p className="text-gray-500 text-sm">
                Customize dashboard colors
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setTheme("pink")}
              className={`rounded-2xl py-4 font-medium transition ${
                theme === "pink"
                  ? "bg-pink-500 text-white shadow-md"
                  : "bg-white border border-pink-100"
              }`}
            >
              Pink
            </button>

            <button
              onClick={() => setTheme("lavender")}
              className={`rounded-2xl py-4 font-medium transition ${
                theme === "lavender"
                  ? "bg-purple-500 text-white shadow-md"
                  : "bg-white border border-pink-100"
              }`}
            >
              Lavender
            </button>

            <button
              onClick={() => setTheme("ocean")}
              className={`rounded-2xl py-4 font-medium transition ${
                theme === "ocean"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-white border border-pink-100"
              }`}
            >
              Ocean
            </button>
          </div>
        </div>

        {/* Budget */}
        <div className="bg-gradient-to-br from-white to-pink-50 border border-pink-100 rounded-3xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 rounded-2xl bg-white shadow-sm">
              <Wallet className="text-pink-500" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-800">
                Monthly Budget
              </h3>
              <p className="text-gray-500 text-sm">
                Track your spending goals
              </p>
            </div>
          </div>

          <input
            type="number"
            placeholder="Enter budget amount"
            className="w-full px-5 py-4 rounded-2xl border border-pink-100 bg-white outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* AI */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-6 text-white shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles />
            <h3 className="text-xl font-semibold">
              AI Assistant
            </h3>
          </div>

          <p className="text-pink-100">
            Smart expense insights are active for this dashboard.
          </p>
        </div>

        {/* Reset */}
        <div className="bg-white border border-red-100 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-red-50">
              <Trash2 className="text-red-500" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-800">
                Reset Data
              </h3>
              <p className="text-gray-500 text-sm">
                Remove imported transactions
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold transition"
          >
            Clear All Transactions
          </button>
        </div>
      </div>
    </>
  );
}