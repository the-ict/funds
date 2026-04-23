"use client";

import { menuItems } from "../lib/data";
import { Plus, RefreshCcw } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 flex flex-col py-8 px-4 w-64 h-screen border-r border-white/20 bg-white/60 backdrop-blur-xl elite-shadow z-50">

      {/* Header */}
      <div className="mb-12 px-4">
        <h1 className="text-2xl font-black tracking-tight text-indigo-900">
          Mablag'
        </h1>
        <p className="text-[10px] uppercase font-bold text-indigo-700/60 mt-1 tracking-widest">
          Elite Oversight
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200",
                isActive
                  ? "text-indigo-700 bg-indigo-50/50 shadow-sm border-r-4 border-indigo-600"
                  : "text-slate-500 hover:bg-slate-50"
              )}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto px-2 space-y-4">
        <button className="w-full bg-indigo-700 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-semibold shadow-lg hover:opacity-90 active:scale-95 transition-all">
          <Plus size={20} />
          <span>Yangi qo'shish</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-2 text-xs text-emerald-600 bg-emerald-50 rounded-lg font-medium">
          <RefreshCcw size={14} />
          <span>Telegram sinxr.</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;