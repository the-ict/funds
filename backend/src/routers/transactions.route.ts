import { Router } from 'express';
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactions.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { createTransactionSchema, updateTransactionSchema } from '../validators/transactions.validators';

const router = Router();

router.post('/', validateRequest(createTransactionSchema), createTransaction);
router.get('/', getTransactions);
router.get('/:id', getTransactionById);
router.put('/:id', validateRequest(updateTransactionSchema), updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;