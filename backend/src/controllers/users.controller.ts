import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, tg_username, tg_id, phone } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        tg_username,
        tg_id: String(tg_id),
        phone,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error, "error here");
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        transactions: true,
        categoires: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: id as string },
      include: {
        transactions: true,
        categoires: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, tg_username, tg_id, phone } = req.body;
    const user = await prisma.user.update({
      where: { id: id as string },
      data: {
        name,
        tg_username,
        tg_id,
        phone,
      },
    });
    res.json(user);
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: id as string },
    });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
};

export const getUserByTgId = async (req: Request, res: Response) => {
  try {
    const { tg_id } = req.params;

    const user = await prisma.user.findUnique({
      where: { tg_id: tg_id as string },
      include: {
        transactions: true,
        categoires: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    };

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};