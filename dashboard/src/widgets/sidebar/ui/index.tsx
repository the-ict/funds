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
    <aside className="fixed left-0 top-0 flex flex-col py-8 px-4 w-64 h-screen border-r border-white/20 bg-white/60 backdrop-blur-xl elite-shadow z-50">

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
                  ? "text-indigo-700 bg-indigo-50"
                  : "text-slate-500 hover:bg-slate-50"
              )}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-2 space-y-4">
        <TransactionModal mode="add">
          <button className="w-full bg-indigo-700 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-semibold shadow-lg hover:opacity-90 active:scale-95 transition-all">
            <Plus size={20} />
            <span>Yangi qo'shish</span>
          </button>
        </TransactionModal>

        <div className="flex items-center gap-2 px-3 py-2 text-xs text-emerald-600 bg-emerald-50 rounded-lg font-medium">
          <RefreshCcw size={14} />
          <span>Telegram sinxr.</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;