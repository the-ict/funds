import { Router } from 'express';
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactions.controller.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { createTransactionSchema, updateTransactionSchema } from '../validators/transactions.validators.js';

import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', validateRequest(createTransactionSchema), createTransaction);
router.get('/', getTransactions);
router.get('/:id', getTransactionById);
router.put('/:id', validateRequest(updateTransactionSchema), updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;