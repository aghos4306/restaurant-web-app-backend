import 'dotenv/config';
import app from './app';
import { prisma } from './config/database';

const PORT = process.env.PORT ?? 3001;

const start = async () => {
  try {
    // Test the database connection before starting the server
    await prisma.$connect();
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();