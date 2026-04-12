import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import router from './routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

// Security headers
app.use(helmet());

// CORS — allow requests from your React apps
app.use(cors({
  origin: [
    process.env.CLIENT_URL ?? 'http://localhost:5173',
    process.env.ADMIN_URL  ?? 'http://localhost:5174',
  ],
  credentials: true,
}));

// Parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check — ALB pings this
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// All API routes under /api/v1
app.use('/api/v1', router);

// Global error handler — must be last
app.use(errorHandler);

export default app;