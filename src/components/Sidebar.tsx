import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
}: Props) {
  const [open, setOpen] = useState(false);

  const items = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Reports",
      icon: <FileText size={20} />,
    },
  ];

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex justify-between items-center px-5 py-4 bg-white border-b border-pink-100 sticky top-0 z-50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          SmartSpend AI
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="p-3 rounded-2xl bg-pink-50"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-0 left-0 h-full
          w-72 bg-white/90 backdrop-blur-2xl
          border-r border-pink-100 shadow-xl
          z-50 p-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              SmartSpend AI
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Finance Intelligence
            </p>
          </div>

          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>

        <nav className="space-y-4">
          {items.map((item) => {
            const active = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition
                  ${
                    active
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                      : "text-slate-700 hover:bg-pink-50"
                  }
                `}
              >
                {item.icon}
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
