import { mockTransactions } from "@/shared/lib/mockData";
import { cn } from "@/shared/lib/utils";
import { formatCurrency } from "@/widgets/statscard/ui";
import { Briefcase, MessageSquare, Mic, Search } from "lucide-react";
import { TransactionModal } from "./transaction-modal";
import { TransactionFilters } from "./transaction-filters";

export default function TransactionsPage() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 border-b border-slate-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-indigo-900">Tranzaksiyalar boshqaruvi</h2>
                    <div className="flex gap-2">
                        <TransactionFilters>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm font-medium border border-slate-200">
                                <Search size={16} /> Filtrlar
                            </button>
                        </TransactionFilters>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <tr>
                            <th className="px-8 py-4 text-left">Sana</th>
                            <th className="px-8 py-4 text-left">Turkum</th>
                            <th className="px-8 py-4 text-left">Miqdor</th>
                            <th className="px-8 py-4 text-left">Izoh</th>
                            <th className="px-8 py-4 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {mockTransactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-8 py-6">
                                    <p className="text-sm font-semibold text-slate-900">{tx.date}</p>
                                    <p className="text-xs text-slate-400">{tx.time}</p>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <Briefcase size={14} />
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">{tx.category}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={cn("text-lg font-bold", tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600')}>
                                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(tx.amount))}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-sm text-slate-500 italic flex items-center gap-2">
                                        {tx.source === 'voice' && <Mic size={14} className="text-indigo-400" />}
                                        {tx.source === 'telegram' && <MessageSquare size={14} className="text-blue-400" />}
                                        "{tx.description}"
                                    </p>
                                </td>
                                <td className="px-8 py-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                    <TransactionModal mode="edit" transaction={tx}>
                                        <button className="text-indigo-600 hover:text-indigo-800 font-bold text-sm">Tahrirlash</button>
                                    </TransactionModal>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
