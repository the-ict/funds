import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getKPIs = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany();

    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
      if (t.type === 'income') income += t.amount;
      if (t.type === 'expense') expense += Math.abs(t.amount);
    });

    res.json({
      income,
      expense,
      profit: income - expense
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch KPIs" });
  }
};

export const getCashflowChart = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'asc' }
    });

    const days = ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'];
    const chartData = days.map(day => ({ day, value: 0 }));

    transactions.forEach(t => {
      const dayIndex = t.createdAt.getDay();
      const mappedIndex = dayIndex === 0 ? 6 : dayIndex - 1;

      const chartItem = chartData[mappedIndex];
      if (chartItem) {
        if (t.type === 'income') {
          chartItem.value += t.amount;
        } else {
          chartItem.value -= Math.abs(t.amount);
        }
      }
    });

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cashflow data" });
  }
};

export const getAnalyticsBreakdown = async (req: Request, res: Response) => {
  try {
    const barData = [
      { name: 'Dush', karta: 40, naqd: 20 },
      { name: 'Sesh', karta: 55, naqd: 35 },
      { name: 'Chor', karta: 30, naqd: 45 },
      { name: 'Pay', karta: 65, naqd: 25 },
      { name: 'Jum', karta: 50, naqd: 30 },
      { name: 'Shan', karta: 60, naqd: 40 },
      { name: 'Yak', karta: 25, naqd: 15 },
    ];

    const pieData = [
      { name: 'Ijara', value: 25000000, color: '#F97316' },
      { name: 'Oyliklar', value: 42000000, color: '#4ADE80' },
      { name: 'Tovar', value: 15450000, color: '#6366F1' },
    ];

    res.json({ barData, pieData });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analytics breakdown" });
  }
};
