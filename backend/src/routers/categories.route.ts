import { Router } from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { createCategorySchema, updateCategorySchema } from '../validators/categories.validators';

const router = Router();

router.post('/', validateRequest(createCategorySchema), createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id', validateRequest(updateCategorySchema), updateCategory);
router.delete('/:id', deleteCategory);

export default router;