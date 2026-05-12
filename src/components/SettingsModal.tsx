import { X, Trash2, Palette, Wallet } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SettingsModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl border-l border-pink-100 z-50 p-8 animate-slide-in">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800">Settings</h2>

          <button onClick={onClose} className="p-3 rounded-2xl hover:bg-pink-50">
            <X />
          </button>
        </div>

        <div className="space-y-8">
          {/* Theme */}
          <div className="bg-pink-50 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="text-pink-500" />
              <h3 className="text-xl font-semibold">Theme</h3>
            </div>

            <select className="w-full border border-pink-200 rounded-2xl px-4 py-3">
              <option>🌸 Soft Pink</option>
              <option>💜 Lavender</option>
              <option>🌊 Blue</option>
            </select>
          </div>

          {/* Budget */}
          <div className="bg-pink-50 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="text-pink-500" />
              <h3 className="text-xl font-semibold">Monthly Budget</h3>
            </div>

            <input
              type="number"
              placeholder="10000"
              className="w-full border border-pink-200 rounded-2xl px-4 py-3"
            />
          </div>

          {/* Clear */}
          <div className="bg-red-50 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="text-red-500" />
              <h3 className="text-xl font-semibold text-red-600">Reset App</h3>
            </div>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="w-full bg-red-500 text-white py-3 rounded-2xl"
            >
              Clear All Transactions
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
