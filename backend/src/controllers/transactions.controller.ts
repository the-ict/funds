import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { amount, type, description, user_id } = req.body;
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
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        user: true,
      },
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await prisma.transaction.findUnique({
      where: { id: id as string },
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

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount, type, description, user_id } = req.body;
    const transaction = await prisma.transaction.update({
      where: { id: id as string },
      data: {
        amount,
        type,
        description,
        user_id,
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

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.transaction.delete({
      where: { id: id as string },
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