
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '24 Okt, 2023',
    time: '14:20',
    category: 'Tushlik',
    amount: -150000,
    type: 'expense',
    description: 'Rayhon restoranida jamoaviy tushlik',
    method: 'Plastik karta',
    source: 'voice'
  },
  {
    id: '2',
    date: '23 Okt, 2023',
    time: '09:45',
    category: 'Sotuv tushumi',
    amount: 12250000,
    type: 'income',
    description: 'Xarid - ID: 45290 uchun to\'lov',
    method: 'Bank o\'tkazmasi',
    source: 'manual'
  },
  {
    id: '3',
    date: '22 Okt, 2023',
    time: '18:10',
    category: 'Transport',
    amount: -45000,
    type: 'expense',
    description: 'Yandex Taxi - Ofisdan uyga',
    method: 'Naqd pul',
    source: 'manual'
  },
  {
    id: '4',
    date: '21 Okt, 2023',
    time: '11:30',
    category: 'Xizmat ko\'rsatish',
    amount: 3500000,
    type: 'income',
    description: 'Konsultatsiya uchun xizmat haqi',
    method: 'Bank o\'tkazmasi',
    source: 'voice'
  },
  {
    id: '5',
    date: '20 Okt, 2023',
    time: '10:00',
    category: 'Ijaraga to\'lov',
    amount: -8500000,
    type: 'expense',
    description: 'Oktyabr oyi uchun ofis ijarasi',
    method: 'Bank o\'tkazmasi',
    source: 'manual'
  },
  {
    id: '6',
    date: '19 Okt, 2023',
    time: '12:00',
    category: 'Marketing',
    amount: -2500000,
    type: 'expense',
    description: 'Facebook reklamalari',
    method: 'Karta',
    source: 'telegram'
  }
];


const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard kpi={mockKPIs[0]} type="income" />
        <StatsCard kpi={mockKPIs[1]} type="expense" />
        <StatsCard kpi={mockKPIs[2]} type="profit" />
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
              <AreaChart data={chartData}>
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
            <Zap className="text-indigo-600" size={20} />
            <h3 className="font-bold text-indigo-900">Aqlli tahlil</h3>
          </div>
          <div className="space-y-6 flex-1">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <Smartphone size={16} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-800 mb-1">Kutilayotgan harajatlar</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Kelasi hafta uchun kommunal to'lovlar kutilmoqda.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp size={16} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-800 mb-1">Tejamkorlik imkoniyati</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Oziq-ovqat harajatlari 15% ga kamaydi.</p>
              </div>
            </div>
          </div>
          <button className="mt-auto w-full py-2 bg-white text-indigo-600 border border-indigo-100 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors">
            To'liq hisobot
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-indigo-900">So'nggi amallar</h2>
          <button className="text-indigo-600 text-sm font-semibold hover:underline">Barchasi</button>
        </div>
        <div className="grid gap-3">
          {mockTransactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between group hover:border-indigo-100 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  {tx.category === 'Tushlik' ? <ShoppingCart size={20} /> : <Briefcase size={20} />}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{tx.category}</h4>
                  <p className="text-xs text-slate-400">{tx.date} • {tx.source === 'voice' ? 'Ovozli' : 'Manual'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn("font-bold", tx.type === 'income' ? "text-emerald-600" : "text-rose-600")}>
                  {tx.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(tx.amount))}
                </p>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{tx.method}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard