import { Router } from 'express';
import { validate } from '../middleware/validate.middleware';
import { requireAuth } from '../middleware/auth.middleware';
import * as adminController from '../controllers/admin.controller';
import { z as zodSchema } from 'zod';

const router = Router();

const createAdminSchema = zodSchema.object({
  name: zodSchema.string().min(3),
  email: zodSchema.string().email(),
  password: zodSchema.string().min(8),
  role: zodSchema.enum(['SUPER_ADMIN', 'ADMIN']).optional(),
});

const updateAdminSchema = zodSchema.object({
  name: zodSchema.string().min(3).optional(),
  email: zodSchema.string().email().optional(),
  role: zodSchema.enum(['SUPER_ADMIN', 'ADMIN']).optional(),
  isActive: zodSchema.boolean().optional(),
});

const changePasswordSchema = zodSchema.object({
  newPassword: zodSchema.string().min(8),
});

// All routes require authentication
router.get('/', requireAuth, adminController.getAdmins);
router.post('/', requireAuth, validate(createAdminSchema), adminController.createAdmin);
router.get('/:id', requireAuth, adminController.getAdminById);
router.put('/:id', requireAuth, validate(updateAdminSchema), adminController.updateAdmin);
router.delete('/:id', requireAuth, adminController.deleteAdmin);
router.post('/:id/change-password', requireAuth, validate(changePasswordSchema), adminController.changePassword);

export default router;
