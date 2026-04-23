import apiClient from '../client';
import { 
  ENDP_ANALYTICS_KPIS, 
  ENDP_ANALYTICS_CASHFLOW, 
  ENDP_ANALYTICS_BREAKDOWN 
} from '../URLs';
import type { DashboardKPIs, ChartDataPoint, AnalyticsBreakdown } from '../types';

export const analyticsService = {
  getKPIs: async (): Promise<DashboardKPIs> => {
    const response = await apiClient.get<DashboardKPIs>(ENDP_ANALYTICS_KPIS);
    return response.data;
  },

  getCashflow: async (): Promise<ChartDataPoint[]> => {
    const response = await apiClient.get<ChartDataPoint[]>(ENDP_ANALYTICS_CASHFLOW);
    return response.data;
  },

  getBreakdown: async (): Promise<AnalyticsBreakdown> => {
    const response = await apiClient.get<AnalyticsBreakdown>(ENDP_ANALYTICS_BREAKDOWN);
    return response.data;
  }
};
