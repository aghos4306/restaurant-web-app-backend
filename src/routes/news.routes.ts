import { Router } from 'express';
import { validate } from '../middleware/validate.middleware';
import { requireAuth } from '../middleware/auth.middleware';
import * as newsController from '../controllers/news.controller';

const router = Router();

export default router;
