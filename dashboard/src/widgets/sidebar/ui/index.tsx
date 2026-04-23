"use client";

import { Plus, RefreshCcw } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { menuItems } from "../lib/data";
import Link from "next/link";
import { TransactionModal } from "@/features/transactions/ui/transaction-modal";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 flex flex-col py-8 px-4 w-64 h-screen border-r border-slate-100 bg-white shadow-sm z-50">

      {/* Logo / Brand */}
      <div className="mb-10 px-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-sm shadow-indigo-200">
            <span className="text-white font-black text-base leading-none">M</span>
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-slate-900 leading-none">Mablag'</h1>
            <p className="text-[10px] font-semibold text-slate-400 mt-0.5 tracking-widest uppercase">Elite Oversight</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200",
                isActive
                  ? "text-indigo-600 bg-indigo-50 font-semibold"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              <item.icon size={18} className={isActive ? "text-indigo-600" : "text-slate-400"} />
              <span>{item.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto space-y-3">
        <TransactionModal mode="add">
          <button className="w-full bg-indigo-600 text-white rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 text-sm font-semibold shadow-md shadow-indigo-200/50 hover:bg-indigo-700 active:scale-[0.98] transition-all">
            <Plus size={18} />
            <span>New Transaction</span>
          </button>
        </TransactionModal>

        <div className="flex items-center gap-2 px-3 py-2 text-xs text-emerald-600 bg-emerald-50 rounded-lg font-medium border border-emerald-100">
          <RefreshCcw size={13} />
          <span>Telegram sinxr.</span>
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;