import { LayoutDashboard, BarChart3, FileText } from "lucide-react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSettingsOpen: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onSettingsOpen }: Props) {
  const items = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Analytics", icon: <BarChart3 size={20} /> },
    { name: "Reports", icon: <FileText size={20} /> },
  ];

  return (
    <div className="w-72 min-h-screen bg-white/85 backdrop-blur-2xl border-r border-pink-100 shadow-xl p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-10">SmartSpend AI</h1>

      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              if (item.name === "Settings") {
                onSettingsOpen();
              } else {
                setActiveTab(item.name);
              }
            }}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition ${
              activeTab === item.name
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                : "hover:bg-pink-50 text-slate-700"
            }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
