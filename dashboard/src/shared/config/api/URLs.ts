const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

const ENDP_AUTH_LOGIN = '/auth/login';
const ENDP_AUTH_VERIFY = '/auth/verify';
const ENDP_TRANSACTIONS = '/transactions';
const ENDP_ANALYTICS_KPIS = '/analytics/kpis';
const ENDP_ANALYTICS_CASHFLOW = '/analytics/cashflow';
const ENDP_ANALYTICS_BREAKDOWN = '/analytics/breakdown';

export {
  BASE_URL,
  ENDP_AUTH_LOGIN,
  ENDP_AUTH_VERIFY,
  ENDP_TRANSACTIONS,
  ENDP_ANALYTICS_KPIS,
  ENDP_ANALYTICS_CASHFLOW,
  ENDP_ANALYTICS_BREAKDOWN
};
