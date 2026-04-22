import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/users.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { createUserSchema, updateUserSchema } from '../validators/users.validators';

const router = Router();

router.post('/', validateRequest(createUserSchema), createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', validateRequest(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;