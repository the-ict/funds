"use client"

import React, { useState } from 'react';
import { useTransactions } from "@/shared/config/react-query/hooks";
import { TransactionFilters, FilterState } from "./transaction-filters";
import { TransactionModal } from "./transaction-modal";
import { cn, formatCurrency, exportToCSV } from "@/shared/lib/utils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  ShoppingBag,
  TrendingUp,
  Truck,
  Zap,
  Building2,
  FileText,
  Landmark,
  Package,
  Users,
  Plus,
  Wallet
} from "lucide-react";
import { Skeleton } from "@/shared/ui/skeleton";
import { EmptyState } from "@/shared/ui/empty-state";

const categoryIcon: Record<string, { icon: React.ElementType; bg: string; color: string }> = {
  // Kirim (Income)
  "Chakana savdo": { icon: ShoppingBag, bg: "bg-emerald-50", color: "text-emerald-500" },
  "Ulgurji savdo": { icon: Package, bg: "bg-teal-50", color: "text-teal-500" },
  "Xizmat ko'rsatish": { icon: Zap, bg: "bg-blue-50", color: "text-blue-500" },
  // Chiqim (Expenses)
  "Soliqlar": { icon: Landmark, bg: "bg-rose-50", color: "text-rose-500" },
  "Ijara": { icon: Building2, bg: "bg-amber-50", color: "text-amber-500" },
  "Oylik maosh": { icon: Users, bg: "bg-indigo-50", color: "text-indigo-500" },
  "Xomashyo": { icon: Package, bg: "bg-orange-50", color: "text-orange-500" },
  "Logistika": { icon: Truck, bg: "bg-slate-100", color: "text-slate-600" },
  "Kommunal to'lovlar": { icon: Zap, bg: "bg-cyan-50", color: "text-cyan-500" },
  "Boshqa": { icon: Briefcase, bg: "bg-gray-50", color: "text-gray-400" },
};

export default function TransactionsPage() {
  const { data: transactions, isLoading } = useTransactions();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: 'all',
    method: ''
  });

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex gap-6 items-stretch">
          <Skeleton className="flex-1 h-32 rounded-3xl" />
          <Skeleton className="w-[380px] h-32 rounded-3xl" />
        </div>
        <Skeleton className="w-full h-12 rounded-xl mb-4" />
        <Skeleton className="w-full h-[500px] rounded-3xl" />
      </div>
    );
  }

  const allTransactions = transactions || [];

  const filteredTransactions = allTransactions.filter(tx => {
    const matchesSearch = !filters.search ||
      (tx.category?.toLowerCase().includes(filters.search.toLowerCase())) ||
      (tx.description?.toLowerCase().includes(filters.search.toLowerCase()));

    const matchesType = filters.type === 'all' || tx.type === filters.type;

    const matchesMethod = !filters.method || tx.method === filters.method;

    return matchesSearch && matchesType && matchesMethod;
  });

  const txData = filteredTransactions;

  const totalIncome = allTransactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = allTransactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  const balance = totalIncome - totalExpense;

  const handleExport = () => {
    exportToCSV(txData, 'tranzaksiyalar-hisoboti');
  };

  const resetFilters = () => setFilters({ search: '', type: 'all', method: '' });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">

      <div className="flex gap-6 items-stretch">

        <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Tranzaksiyalar boshqaruvi
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Barcha kirim va chiqim amallarining batafsil ro'yxati
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors"
              >
                <Download size={15} />
                Hisobot
              </button>
              <TransactionFilters
                filters={filters}
                setFilters={setFilters}
                onReset={resetFilters}
              >
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-colors">
                  <Filter size={15} />
                  Filtrlar
                  {(filters.search || filters.type !== 'all' || filters.method) && (
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  )}
                </button>
              </TransactionFilters>
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-colors">
                <Download size={15} />
                Eksport
              </button>
            </div>
          </div>

          {/* Summary stats */}
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <ArrowUpRight size={20} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Jami Kirim</p>
                <p className="text-xl font-black text-slate-900">{formatCurrency(totalIncome)}</p>
              </div>
            </div>

            <div className="w-px h-10 bg-slate-100" />

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                <ArrowDownLeft size={20} className="text-rose-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Jami Chiqim</p>
                <p className="text-xl font-black text-slate-900">{formatCurrency(totalExpense)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-64 bg-[#2e2575] rounded-3xl p-7 flex flex-col justify-between shadow-lg relative overflow-hidden shrink-0">
          <div className="absolute bottom-0 right-0 flex items-end gap-1 p-4 opacity-20">
            {[32, 48, 28, 60, 40, 52, 36].map((h, i) => (
              <div key={i} className="w-4 bg-white rounded-t-md" style={{ height: h }} />
            ))}
          </div>

          <div className="relative">
            <p className="text-indigo-200 text-xs font-semibold tracking-wide mb-3">Joriy balans</p>
            <p className="text-white font-black text-2xl leading-tight">
              {formatCurrency(balance)}
            </p>
          </div>

          <div className="relative flex items-center gap-2 mt-4">
            <div className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center shrink-0">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1.5 4.5L3 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-indigo-200 text-[11px] font-medium">Hisob raqami bilan moslangan</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        {txData.length === 0 ? (
          <div className="p-12">
            <EmptyState
              title="Hali hech qanday aylanma yo'q"
              description="Kirim va chiqimlaringizni nazorat qilish uchun birinchi tranzaksiyangizni qo'shing."
              icon={<Wallet size={32} strokeWidth={1.5} />}
              action={
                <TransactionModal mode="add">
                  <button className="cursor-pointer px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-sm hover:shadow flex items-center gap-2">
                    <Plus size={18} strokeWidth={2.5} />
                    Yangi tranzaksiya qo'shish
                  </button>
                </TransactionModal>
              }
            />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sana</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Turkum</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Miqdor</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Izoh</th>
                <th className="px-8 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {txData.map((tx) => {
                const category = tx.category || "Noma'lum";
                const catMeta = categoryIcon[category] ?? { icon: Briefcase, bg: "bg-slate-50", color: "text-slate-400" };
                const Icon = catMeta.icon;
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* Date */}
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-slate-900">{tx.date || new Date(tx.createdAt).toLocaleDateString()}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{tx.time || new Date(tx.createdAt).toLocaleTimeString()}</p>
                    </td>

                    {/* Category */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", catMeta.bg)}>
                          <Icon size={16} className={catMeta.color} />
                        </div>
                        <span className="text-sm font-semibold text-slate-800">{category}</span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-8 py-6">
                      <span className={cn(
                        "text-base font-black",
                        tx.type === "income" ? "text-emerald-500" : "text-rose-500"
                      )}>
                        {tx.type === "income" ? "+ " : "- "}
                        {formatCurrency(Math.abs(tx.amount))}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="px-8 py-6 max-w-[220px]">
                      <p className="text-sm text-slate-500 italic leading-snug">
                        &ldquo;{tx.description}&rdquo;
                      </p>
                    </td>

                    {/* Edit */}
                    <td className="px-8 py-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <TransactionModal mode="edit" transaction={tx}>
                        <button className="text-indigo-500 hover:text-indigo-700 text-xs font-bold transition-colors">
                          Tahrirlash
                        </button>
                      </TransactionModal>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="px-8 py-5 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">Jami: 142 ta amal ko'rsatilmoqda</p>

          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
              <ChevronLeft size={16} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={cn(
                  "w-8 h-8 rounded-lg text-sm font-bold transition-colors",
                  page === 1
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                    : "text-slate-500 hover:bg-slate-100"
                )}
              >
                {page}
              </button>
            ))}
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
