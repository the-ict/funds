import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { name, type } = req.body;
    const user_id = req.user?.user_id;

    const category = await prisma.categories.create({
      data: {
        name,
        type: type,
        user_id: String(user_id),
      },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

export const getCategories = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user?.user_id;
    const categories = await prisma.categories.findMany({
      where: { user_id: String(user_id) },
      include: {
        user: true,
      },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const getCategoryById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.user_id;
    const category = await prisma.categories.findFirst({
      where: {
        id: id as string,
        user_id: String(user_id)
      },
      include: {
        user: true,
      },
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.user_id;
    const { name, type } = req.body;
    const category = await prisma.categories.update({
      where: {
        id: id as string,
        user_id: String(user_id)
      },
      data: {
        name,
        type
      },
    });
    res.json(category);
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.status(500).json({ error: 'Failed to update category' });
    }
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.user_id;
    await prisma.categories.delete({
      where: {
        id: id as string,
        user_id: String(user_id)
      },
    });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Category not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete category' });
    }
  }
};