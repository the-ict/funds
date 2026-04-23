import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByTgId
} from '../controllers/users.controller.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import { createUserSchema, updateUserSchema } from '../validators/users.validators.js';

const router = Router();

router.post('/', validateRequest(createUserSchema), createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', validateRequest(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);
router.get('/tg/:tg_id', getUserByTgId);

export default router;