import { Router } from 'express';
import authRoutes   from './auth.routes';
import newsRoutes   from './news.routes';
import adminRoutes  from './admin.routes';
import uploadRoutes from './upload.routes';

const router = Router();

router.use('/auth',   authRoutes);
router.use('/news',   newsRoutes);
router.use('/admins', adminRoutes);
router.use('/upload', uploadRoutes);

export default router;