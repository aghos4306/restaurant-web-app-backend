import { Router } from 'express';
import { validate } from '../middleware/validate.middleware';
import { requireAuth } from '../middleware/auth.middleware';
import * as newsController from '../controllers/news.controller';
import { z as zodSchema } from 'zod';

const router = Router();

const createNewsSchema = zodSchema.object({
  title: zodSchema.string().min(5),
  body: zodSchema.string().min(20),
  slug: zodSchema.string().min(3),
  coverMediaUrl: zodSchema.string().url().optional(),
  coverMediaType: zodSchema.enum(['IMAGE', 'VIDEO']).optional(),
  status: zodSchema.enum(['DRAFT', 'PUBLISHED']).optional(),
});

const updateNewsSchema = zodSchema.object({
  title: zodSchema.string().min(5).optional(),
  body: zodSchema.string().min(20).optional(),
  slug: zodSchema.string().min(3).optional(),
  coverMediaUrl: zodSchema.string().url().optional().nullable(),
  coverMediaType: zodSchema.enum(['IMAGE', 'VIDEO']).optional().nullable(),
  status: zodSchema.enum(['DRAFT', 'PUBLISHED']).optional(),
});

// Public routes
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.get('/slug/:slug', newsController.getNewsBySlug);

// Protected routes (admin only)
router.post('/', requireAuth, validate(createNewsSchema), newsController.createNews);
router.put('/:id', requireAuth, validate(updateNewsSchema), newsController.updateNews);
router.delete('/:id', requireAuth, newsController.deleteNews);
router.patch('/:id/publish', requireAuth, newsController.publishNews);

export default router;
