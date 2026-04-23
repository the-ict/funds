"use client";

import type {
  LoginRequest,
  VerifyRequest,
  CreateTransactionDTO
} from '../api/types';
import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { transactionsService } from '../api/services/transactions.service';
import { analyticsService } from '../api/services/analytics.service';
import { authService } from '../api/services/auth.service';
import { categoriesService } from '../api/services/categories.service';


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

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateTransactionDTO> }) =>
      transactionsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => transactionsService.delete(id),
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

// Categories Hooks
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => categoriesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
