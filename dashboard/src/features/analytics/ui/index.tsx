"use client";

import { chartData } from '@/shared/lib/mockData';
import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

export default function AnalyticsPage() {
    const data = [
        { name: 'Operatsion', value: 34120, color: '#1f108e' },
        { name: 'Marketing', value: 12400, color: '#10b981' },
        { name: 'Xizmatlar', value: 11710, color: '#f59e0b' },
    ];

    return (
        <div className="grid grid-cols-12 gap-8 animate-in fade-in duration-500">
            <div className="col-span-8 bg-white rounded-3xl p-8 elite-shadow border border-slate-50">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Daromad o'sishi</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                            <Tooltip />
                            <Bar dataKey="value" fill="#1f108e" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="col-span-4 bg-white rounded-3xl p-8 elite-shadow border border-slate-50 flex flex-col items-center">
                <h3 className="text-xl font-bold text-slate-900 mb-8">Xarajatlar tarkibi</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full space-y-4 mt-4">
                    {data.map((item) => (
                        <div key={item.name} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            <span className="font-bold text-slate-900">${item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
