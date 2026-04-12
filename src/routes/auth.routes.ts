import { Router } from 'express';
import { validate } from '../middleware/validate.middleware';
import { requireAuth } from '../middleware/auth.middleware';
import * as authController from '../controllers/auth.controller';
import { z as zodSchema } from 'zod';

const router = Router();

const loginSchema = zodSchema.object({
  email: zodSchema.email(),
  password: zodSchema.string().min(6),
});

const signupSchema = zodSchema.object({
  name: zodSchema.string().min(2),
  email: zodSchema.email(),
  password: zodSchema.string().min(8),
  role: zodSchema.enum(['SUPER_ADMIN', 'ADMIN']).optional(),
});

const forgotSchema = zodSchema.object({
  email: zodSchema.email(),
});

const resetSchema = zodSchema.object({
  token: zodSchema.string(),
  password: zodSchema.string().min(8),
});

router.post('/login',          validate(loginSchema),   authController.login);
router.post('/signup',         validate(signupSchema),  authController.signup);
router.post('/forgot-password',validate(forgotSchema),  authController.forgotPassword);
router.post('/reset-password', validate(resetSchema),   authController.resetPassword);
router.get('/me',              requireAuth,             authController.me);

export default router;