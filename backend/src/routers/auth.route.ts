import { Router } from "express";
import { login, verify } from "../controllers/auth.controller.js";
import { loginSchema, verifySchema } from "../validators/auth.validators.js";
import { validateRequest } from "../middleware/validation.middleware.js";

const router = Router();

router.post("/login", validateRequest(loginSchema), login);
router.post("/verify", validateRequest(verifySchema), verify)

export default router;