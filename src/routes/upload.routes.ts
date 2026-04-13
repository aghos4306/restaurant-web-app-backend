import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import * as uploadController from '../controllers/upload.controller';
import { createUploadthing } from 'uploadthing/express';

const router = Router();

// Protected routes - admin only
router.post('/news-image', requireAuth, uploadController.uploadFile);
router.post('/news-video', requireAuth, uploadController.uploadFile);
router.delete('/:fileKey', requireAuth, uploadController.deleteFile);

export default router;
