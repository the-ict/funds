"use client";

import {
  cn
} from "@/shared/lib/utils";
import StatsCard, {
} from "@/widgets/statscard/ui";
import { formatCurrency } from "@/shared/lib/utils";
import {
  Briefcase,
  ShoppingCart,
  TrendingUp,
  Wallet,
  Plus
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from "recharts";
import {
  useDashboardStats,
  useCashflowChart,
  useTransactions
} from "@/shared/config/react-query/hooks";
import { Skeleton } from "@/shared/ui/skeleton";
import { EmptyState } from "@/shared/ui/empty-state";


const Dashboard = () => {
  const { data: statsData, isLoading: isStatsLoading } = useDashboardStats();
  const { data: chartData, isLoading: isChartLoading } = useCashflowChart();
  const { data: txData, isLoading: isTxLoading } = useTransactions();

  if (isStatsLoading || isChartLoading || isTxLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="lg:col-span-2 h-[400px] rounded-3xl" />
          <div className="space-y-6">
            <Skeleton className="h-[200px] rounded-3xl" />
            <Skeleton className="h-[200px] rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  const kpis = [
    { label: 'Kirim', value: statsData?.income || 0, trend: 12.5, trendLabel: 'o\'sish' },
    { label: 'Chiqim', value: statsData?.expense || 0, trend: -4.2, trendLabel: 'ko\'paygan' },
    { label: 'Sof Foyda', value: statsData?.profit || 0, trend: 8.1, trendLabel: 'barqaror' }
  ];

  const transactions = txData || [];
  const cashflowData = chartData || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard kpi={kpis[0]} type="income" />
        <StatsCard kpi={kpis[1]} type="expense" />
        <StatsCard kpi={kpis[2]} type="profit" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white elite-shadow rounded-2xl p-8 border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-indigo-900">Pul oqimi tahlili</h2>
              <p className="text-sm text-slate-500">Oylik harakat dinamikasi</p>
            </div>
          </div>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashflowData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel elite-shadow rounded-2xl p-6 flex flex-col bg-indigo-50/30">
          <div className="flex items-center gap-2 mb-6">
            <Wallet className="text-indigo-600" size={20} />
            <h3 className="font-bold text-indigo-900">Byudjet holati</h3>
          </div>
          <div className="space-y-6 flex-1">
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-slate-700">Oylik byudjet</span>
                <span className="text-indigo-600">65% sarflandi</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Belgilangan limitgacha yana 3,500,000 UZS qoldi.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <button className="flex flex-col items-center justify-center p-3 bg-white border border-slate-100 rounded-xl hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                  <TrendingUp size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-700">Kirim qoshish</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-white border border-slate-100 rounded-xl hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-2">
                  <ShoppingCart size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-700">Chiqim qoshish</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-indigo-900">So'nggi amallar</h2>
          <button className="text-indigo-600 text-sm font-semibold hover:underline">Barchasi</button>
        </div>
        <div className="grid gap-3">
          {transactions.length === 0 ? (
            <EmptyState
              title="Amallar topilmadi"
              description="Sizda hali birorta ham tranzaksiya mavjud emas."
              icon={<Briefcase size={32} strokeWidth={1.5} />}
            />
          ) : (
            transactions.slice(0, 3).map((tx) => (
              <div key={tx.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between group hover:border-indigo-100 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    {tx.category === 'Tushlik' ? <ShoppingCart size={20} /> : <Briefcase size={20} />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{tx.category || "Noma'lum"}</h4>
                    <p className="text-xs text-slate-400">{tx.date || new Date(tx.createdAt).toLocaleDateString()} • {tx.source === 'voice' ? 'Ovozli' : 'Manual'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn("font-bold text-sm", tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500')}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">Muvaffaqiyatli</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard