"use client";

import React from 'react';
import { 
  Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis 
} from 'recharts';
import { 
  Calendar, ChevronRight, Download, Filter, Lightbulb, PiggyBank, ShieldCheck, TrendingUp, Zap 
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

// Mock Data
const revenueData = [
  { day: 'DUSH', hozirgi: 20000, prognoz: 18000 },
  { day: 'SESH', hozirgi: 35000, prognoz: 30000 },
  { day: 'CHOR', hozirgi: 25000, prognoz: 22000 },
  { day: 'PAY', hozirgi: 50000, prognoz: 45000 },
  { day: 'JUMA', hozirgi: 30000, prognoz: 28000 },
  { day: 'SHAN', hozirgi: 65000, prognoz: 60000 },
  { day: 'YAK', hozirgi: 40000, prognoz: 38000 },
];

const expenseData = [
  { name: 'Operatsion', value: 34120, color: '#4f46e5' },
  { name: 'Marketing', value: 12400, color: '#10b981' },
  { name: 'Xizmatlar', value: 11710, color: '#f59e0b' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tahlil markazi</h1>
          <p className="text-sm text-slate-500 mt-1">
            Moliyaviy ko'rsatkichlaringizning chuqur tahlili va kelajakdagi prognozlari.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-slate-50 p-1 rounded-xl flex items-center border border-slate-100">
            <button className="px-6 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold shadow-sm">
              Oylik
            </button>
            <button className="px-6 py-2 text-slate-500 hover:text-slate-700 rounded-lg text-sm font-medium transition-colors">
              Choraklik
            </button>
            <button className="px-6 py-2 text-slate-500 hover:text-slate-700 rounded-lg text-sm font-medium transition-colors">
              Yillik
            </button>
          </div>
          
          <Button variant="outline" className="gap-2 border-slate-200 text-slate-700 font-medium h-10 px-4 rounded-xl">
            <Calendar size={16} className="text-slate-400" />
            Iyun, 2024
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Revenue Growth Card */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Daromad o'sishi</h3>
              <p className="text-sm text-slate-500 mt-1">O'tgan davr bilan solishtirma tahlil</p>
            </div>
            <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                HOZIRGI
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                PROGNOZ
              </div>
            </div>
          </div>

          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorHozirgi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} 
                  dy={10}
                />
                <RechartsTooltip />
                <Area 
                  type="monotone" 
                  dataKey="prognoz" 
                  stroke="#cbd5e1" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent" 
                />
                <Area 
                  type="monotone" 
                  dataKey="hozirgi" 
                  stroke="#4f46e5" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorHozirgi)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-end justify-between pt-6 border-t border-slate-50">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Jami Daromad</p>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-slate-900">$142,500.00</span>
                <span className="flex items-center gap-1 text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  <TrendingUp size={14} /> +12.4%
                </span>
              </div>
            </div>
            <button className="text-indigo-600 text-sm font-bold hover:text-indigo-800 flex items-center gap-1 transition-colors">
              Batafsil ko'rish <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Xarajatlar</h3>
            <p className="text-sm text-slate-500 mt-1">Kategoriyalar bo'yicha</p>
          </div>
          
          <div className="flex-1 relative min-h-[220px] flex items-center justify-center my-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Jami</span>
              <span className="text-2xl font-black text-slate-900">$58,230</span>
            </div>
          </div>

          <div className="space-y-4">
            {expenseData.map((item) => (
              <div key={item.name} className="flex justify-between items-center group">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-bold text-slate-700">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-slate-500">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Recommendations */}
      <div className="space-y-6 mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Aqlli tavsiyalar</h2>
          <button className="text-indigo-600 text-sm font-bold hover:text-indigo-800 flex items-center gap-1 transition-colors">
            Hammasini ko'rish <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#2e2575] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Lightbulb size={120} />
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm">
              <PiggyBank size={20} className="text-indigo-200" />
            </div>
            <h4 className="text-lg font-bold mb-3">Soliqlarni optimallashtirish</h4>
            <p className="text-indigo-100/70 text-sm leading-relaxed mb-8">
              Kelgusi chorak uchun operatsion xarajatlarni 15% ga kamaytirish orqali soliqlardan $4,500 tejashingiz mumkin.
            </p>
            <button className="bg-white text-[#2e2575] px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-indigo-50 transition-colors">
              Rejani ko'rish
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-6">
              <TrendingUp size={20} className="text-emerald-600" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-3">Yangi investitsiya imkoniyati</h4>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Portfelingizdagi naqd pul qoldig'i me'yordan 22% yuqori. Uni likvid aktivlarga yo'naltirishni tavsiya etamiz.
            </p>
            <button className="bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-200 hover:bg-slate-100 transition-colors">
              Tahlil qilish
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-6">
              <ShieldCheck size={20} className="text-amber-500" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-3">Moliyaviy xavfsizlik</h4>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
              Zahira jamg'armangiz 6 oylik xarajatlarni qoplash darajasiga yetdi. Sizning moliyaviy barqarorligingiz 94/100.
            </p>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[94%] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Expected Transactions */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Kutilayotgan tranzaksiyalar</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="border-slate-200 text-slate-500 rounded-xl h-10 w-10">
              <Filter size={18} />
            </Button>
            <Button variant="outline" size="icon" className="border-slate-200 text-slate-500 rounded-xl h-10 w-10">
              <Download size={18} />
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
          <table className="w-full">
            <thead className="bg-white text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-left">Hamkor</th>
                <th className="px-8 py-5 text-left">Sana</th>
                <th className="px-8 py-5 text-left">Kategoriya</th>
                <th className="px-8 py-5 text-left">Holat</th>
                <th className="px-8 py-5 text-right">Summa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {/* Row 1 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                      A
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Amazon Web Services</p>
                      <p className="text-xs text-slate-500">Cloud Infrastructure</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm font-medium text-slate-600">24 Iyun, 2024</td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
                    TEXNOLOGIYA
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-sm font-bold text-amber-600">Kutilmoqda</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right font-black text-slate-900">
                  -$2,450.00
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-sm">
                      G
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Global Partners LLC</p>
                      <p className="text-xs text-slate-500">Consulting Fee</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm font-medium text-slate-600">22 Iyun, 2024</td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
                    XIZMATLAR
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-emerald-600">Tasdiqlangan</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right font-black text-emerald-600">
                  +$15,000.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
