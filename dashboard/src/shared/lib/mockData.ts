export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  time: string;
  category: string;
  amount: number;
  type: TransactionType;
  description: string;
  method: string;
  source: 'telegram' | 'voice' | 'manual';
}

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

export const chartData = [
  { day: 'Dush', value: 40 },
  { day: 'Sesh', value: 65 },
  { day: 'Chor', value: 35 },
  { day: 'Pay', value: 90 },
  { day: 'Jum', value: 45 },
  { day: 'Shan', value: 80 },
  { day: 'Yak', value: 20 },
];
