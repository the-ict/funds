import { Router } from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.controller.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import {
  createCategorySchema,
  updateCategorySchema
} from '../validators/categories.validators.js';

import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', validateRequest(createCategorySchema), createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', validateRequest(updateCategorySchema), updateCategory);
router.delete('/:id', deleteCategory);

export default router;