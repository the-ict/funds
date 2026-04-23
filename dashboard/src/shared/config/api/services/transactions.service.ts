import apiClient from '../client';
import { ENDP_TRANSACTIONS } from '../URLs';
import type { Transaction, CreateTransactionDTO } from '../types';

export const transactionsService = {
  getAll: async (): Promise<Transaction[]> => {
    const response = await apiClient.get<Transaction[]>(ENDP_TRANSACTIONS);
    return response.data;
  },

  getById: async (id: string): Promise<Transaction> => {
    const response = await apiClient.get<Transaction>(`${ENDP_TRANSACTIONS}/${id}`);
    return response.data;
  },

  create: async (data: CreateTransactionDTO): Promise<Transaction> => {
    const response = await apiClient.post<Transaction>(ENDP_TRANSACTIONS, data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateTransactionDTO>): Promise<Transaction> => {
    const response = await apiClient.put<Transaction>(`${ENDP_TRANSACTIONS}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${ENDP_TRANSACTIONS}/${id}`);
  }
};
