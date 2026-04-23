"use client"

import React from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Send,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  useDashboardStats,
  useAnalyticsBreakdown
} from "@/shared/config/react-query/hooks";
import {
  Skeleton
} from "@/shared/ui/skeleton";
import {
  formatCurrency
} from "@/shared/lib/utils";

const StatCard = ({ title, amount, percentage, isUp, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} className="text-gray-700" />
      </div>
      <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {isUp ? '+' : ''}{percentage}%
      </div>
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(amount)}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const { data: statsData, isLoading: isStatsLoading } = useDashboardStats();
  const { data: breakdownData, isLoading: isBreakdownLoading } = useAnalyticsBreakdown();

  if (isStatsLoading || isBreakdownLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-[400px] rounded-2xl" />
          <Skeleton className="h-[400px] rounded-2xl" />
        </div>
      </div>
    );
  }

  const pieData = breakdownData?.pieData || [];
  const barData = breakdownData?.barData || [];

  return (
    <div className="max-h-screen overflow-y-auto font-sans">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Umumiy tushum" amount={(statsData?.income || 0).toLocaleString()} percentage="12.5" isUp={true} icon={TrendingUp} color="bg-green-50" />
        <StatCard title="Jami xarajatlar" amount={(statsData?.expense || 0).toLocaleString()} percentage="-4.2" isUp={false} icon={TrendingDown} color="bg-red-50" />
        <StatCard title="Sof foyda" amount={(statsData?.profit || 0).toLocaleString()} percentage="8.1" isUp={true} icon={Wallet} color="bg-indigo-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Xarajatlar Tarkibi (Pie Chart) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-800">Xarajatlar tarkibi</h3>
              <p className="text-xs text-gray-400">Kategoriyalar bo'yicha</p>
            </div>
            <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
          </div>

          <div className="relative">
            {pieData.length === 0 ? (
              <div className="h-40 flex items-center justify-center">
                <p className="text-slate-400 text-sm font-medium">Ma'lumotlar yo'q</p>
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-2xl font-bold text-slate-800">100%</span>
                  <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Jami</p>
                </div>
              </>
            )}
          </div>

          <div className="space-y-4 mt-6">
            {pieData.length === 0 ? (
              <Skeleton className="w-full h-24" />
            ) : (
              pieData.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{formatCurrency(item.value)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tushum Tahlili (Bar Chart) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-bold text-slate-800">Tushum tahlili</h3>
                <p className="text-xs text-gray-400">To'lov usuli: Naqd va Karta</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-600" />
                  <span className="text-xs text-gray-500">Karta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-100" />
                  <span className="text-xs text-gray-500">Naqd</span>
                </div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94A3B8', fontSize: 12 }}
                    dy={10}
                  />
                  <Bar dataKey="karta" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={30} />
                  <Bar dataKey="naqd" fill="#F1F5F9" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-8 pt-8 border-t border-gray-50">
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Karta orqali</p>
                <h4 className="text-xl font-bold text-slate-800">98,400,000 UZS</h4>
                <div className="flex items-center gap-1 text-green-500 mt-1">
                  <ArrowUpRight size={14} />
                  <span className="text-xs font-medium">18% o'sish</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Naqd pulda</p>
                <h4 className="text-xl font-bold text-slate-800">46,800,000 UZS</h4>
                <div className="flex items-center gap-1 text-red-500 mt-1">
                  <ArrowDownRight size={14} />
                  <span className="text-xs font-medium">5% kamayish</span>
                </div>
              </div>
            </div>
          </div>

          {/* Telegram Info Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-8">
            <div className="w-32 h-24 bg-slate-900 rounded-xl overflow-hidden relative shadow-lg">
              <div className="absolute inset-2 border border-slate-700 rounded-lg opacity-50" />
              <div className="absolute bottom-2 left-2 right-2 h-1 bg-indigo-500 rounded-full" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-indigo-600 mb-1">
                <Send size={14} fill="currentColor" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Tezkor ma'lumot</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">Telegram orqali yangilanishlar faol</h3>
              <p className="text-sm text-gray-500 mt-1">Barcha moliyaviy amallar va tahlillar real vaqtda @mablag_bot orqali yuborilmoqda.</p>
              <div className="inline-flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-lg mt-4">
                <div className="w-4 h-4 bg-indigo-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                </div>
                <span className="text-xs font-semibold text-indigo-700">Telegram bilan sinxronlangan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;