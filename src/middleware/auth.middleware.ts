import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

// Protects any route — rejects requests without a valid JWT
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Locks a route down to SUPER_ADMIN only
export const requireSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.admin?.role !== 'SUPER_ADMIN') {
    res.status(403).json({ message: 'Super admin access required' });
    return;
  }
  next();
};