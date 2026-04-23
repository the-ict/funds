"use client";

import type { LoginRequest, VerifyRequest, CreateTransactionDTO } from '../api/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '../api/services/transactions.service';
import { analyticsService } from '../api/services/analytics.service';
import { authService } from '../api/services/auth.service';

// Auth Hooks
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
  });
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: (data: VerifyRequest) => authService.verify(data),
  });
};

// Transactions Hooks
export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: transactionsService.getAll,
  });
};

export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: ['transactions', id],
    queryFn: () => transactionsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTransactionDTO) => transactionsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
};

// Analytics Hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['analytics', 'kpis'],
    queryFn: analyticsService.getKPIs,
  });
};

export const useCashflowChart = () => {
  return useQuery({
    queryKey: ['analytics', 'cashflow'],
    queryFn: analyticsService.getCashflow,
  });
};

export const useAnalyticsBreakdown = () => {
  return useQuery({
    queryKey: ['analytics', 'breakdown'],
    queryFn: analyticsService.getBreakdown,
  });
};
