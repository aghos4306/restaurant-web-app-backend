import jwt from 'jsonwebtoken';
import { AuthenticatedAdmin } from '../types';

const secret = process.env.JWT_SECRET!;
const expiresIn = process.env.JWT_EXPIRES_IN ?? '7d';

export const signToken = (payload: AuthenticatedAdmin): string => {
  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string): AuthenticatedAdmin => {
  return jwt.verify(token, secret) as AuthenticatedAdmin;
};