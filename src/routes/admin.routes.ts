import { Router } from 'express';
import { validate } from '../middleware/validate.middleware';
import { requireAuth } from '../middleware/auth.middleware';
import * as adminController from '../controllers/admin.controller';

const router = Router();

export default router;
