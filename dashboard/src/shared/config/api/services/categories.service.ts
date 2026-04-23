import apiClient from '../client';
import { ENDP_CATEGORIES } from '../URLs';
import type { Category, CreateCategoryDTO } from '../types';

export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>(ENDP_CATEGORIES);
    return response.data;
  },

  getById: async (id: string): Promise<Category> => {
    const response = await apiClient.get<Category>(`${ENDP_CATEGORIES}/${id}`);
    return response.data;
  },

  create: async (data: CreateCategoryDTO): Promise<Category> => {
    const response = await apiClient.post<Category>(ENDP_CATEGORIES, data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateCategoryDTO>): Promise<Category> => {
    const response = await apiClient.put<Category>(`${ENDP_CATEGORIES}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${ENDP_CATEGORIES}/${id}`);
  }
};
