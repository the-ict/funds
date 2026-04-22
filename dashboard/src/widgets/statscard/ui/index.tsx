import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingDown, TrendingUp, Wallet } from "lucide-react";

export const mockKPIs: KPI[] = [
    { label: 'Kirim', value: 45200000, trend: 12.5, trendLabel: 'o\'sish' },
    { label: 'Chiqim', value: 28450000, trend: -4.2, trendLabel: 'ko\'paygan' },
    { label: 'Sof Foyda', value: 16750000, trend: 8.1, trendLabel: 'barqaror' }
];

interface KPI {
    label: string;
    value: number;
    trend: number;
    trendLabel: string;
}

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount) + " so'm";
};



const StatsCard = ({ kpi, type }: { kpi: typeof mockKPIs[0], type: 'income' | 'expense' | 'profit' }) => {
    const isProfit = type === 'profit';
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={cn(
                "glass-panel elite-shadow p-6 rounded-2xl relative overflow-hidden group",
                isProfit && "bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-none"
            )}
        >
            <div className="flex justify-between items-start mb-4">
                <div className={cn(
                    "p-2 rounded-lg",
                    type === 'income' && "bg-emerald-50 text-emerald-600",
                    type === 'expense' && "bg-rose-50 text-rose-600",
                    isProfit && "bg-white/20 text-white"
                )}>
                    {type === 'income' && <TrendingUp size={24} />}
                    {type === 'expense' && <TrendingDown size={24} />}
                    {isProfit && <Wallet size={24} />}
                </div>
                <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full",
                    type === 'income' && "bg-emerald-50 text-emerald-600",
                    type === 'expense' && "bg-rose-50 text-rose-600",
                    isProfit && "bg-white/20 text-white"
                )}>
                    {kpi.trend > 0 ? '+' : ''}{kpi.trend}%
                </span>
            </div>
            <p className={cn("text-xs font-bold uppercase tracking-widest mb-1", isProfit ? "text-indigo-100/80" : "text-slate-500")}>
                Umumiy {kpi.label}
            </p>
            <h3 className={cn("text-2xl font-black tracking-tight", !isProfit && "text-indigo-900")}>
                {formatCurreny(kpi.value)}
            </h3>
            <div className={cn("mt-4 flex items-center gap-2 text-xs", isProfit ? "text-indigo-200/60" : "text-slate-400")}>
                <ShieldCheck size={14} />
                <span>Tasdiqlangan balans</span>
            </div>
        </motion.div>
    );
};

export default StatsCard;
