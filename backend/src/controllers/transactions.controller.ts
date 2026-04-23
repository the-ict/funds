import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import type { AuthRequest } from '../middleware/auth.middleware';

export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { amount, type, description, category, method, date } = req.body;
    const user_id = req.user?.user_id;

    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized: User ID not found in token" });
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        description,
        user_id,
      },
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user?.user_id;
    const transactions = await prisma.transaction.findMany({
      where: { user_id: String(user_id) },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

export const getTransactionById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.user_id;
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: String(id),
        user_id: String(user_id)
      },
      include: {
        user: true,
      },
    });
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaction' });
  }
};

export const updateTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.user_id;
    const { amount, type, description, category, method, date } = req.body;

    const transaction = await prisma.transaction.update({
      where: {
        id: String(id),
        user_id: String(user_id)
      },
      data: {
        amount,
        type,
        description,
      },
    });
    res.json(transaction);
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Transaction not found' });
    } else {
      res.status(500).json({ error: 'Failed to update transaction' });
    }
  }
};

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.user_id;

    await prisma.transaction.delete({
      where: {
        id: id as string,
        user_id: String(user_id)
      },
    });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Transaction not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete transaction' });
    }
  }
};