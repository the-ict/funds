import { Router } from "express";
import { login, verify } from "../controllers/auth.controller";
import { loginSchema, verifySchema } from "../validators/auth.validators";
import { validateRequest } from "../middleware/validation.middleware";

const router = Router();

router.post("/login", validateRequest(loginSchema), login);
router.post("/verify", validateRequest(verifySchema), verify)

export default router;