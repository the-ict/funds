export interface ResWithPagination<T> {
  success: boolean;
  message: string;
  links: Links;
  total_items: number;
  total_pages: number;
  page_size: number;
  current_page: number;
  data: T[];
}

interface Links {
  next: number | null;
  previous: number | null;
}

export interface ReqWithPagination {
  _start?: number;
  _limit?: number;
}

// User / Auth
export interface User {
  id: string;
  name: string;
  tg_username: string;
  tg_id: string;
  phone: string;
}

export interface LoginRequest {
  phone: string;
}

export interface VerifyRequest {
  phone: string;
  code: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
}

// Transactions
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  description: string;
  user_id: string;
  createdAt: string;
  updatedAt: string;
  // UI mapped fields
  category?: string;
  method?: string; 
  source?: string;
  date?: string;
  time?: string;
}

export interface CreateTransactionDTO {
  amount: number;
  type: TransactionType;
  description: string;
  user_id?: string;
  tg_id?: string;
}

// Analytics
export interface DashboardKPIs {
  income: number;
  expense: number;
  profit: number;
}

export interface ChartDataPoint {
  day: string;
  value: number;
}

export interface BarChartData {
  name: string;
  karta: number;
  naqd: number;
}

export interface PieChartData {
  name: string;
  value: number;
  color: string;
}

export interface AnalyticsBreakdown {
  barData: BarChartData[];
  pieData: PieChartData[];
}
