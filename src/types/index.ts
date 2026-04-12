export interface AuthenticatedAdmin {
  id: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
  name: string;
}

// Extend Express Request so every route handler can access req.admin
declare global {
  namespace Express {
    interface Request {
      admin?: AuthenticatedAdmin;
    }
  }
}