import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginAdmin(email, password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    const admin = await authService.signupAdmin(name, email, password, role);
    res.status(201).json({ message: 'Admin created', admin });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await authService.forgotPassword(req.body.email);
    // Always return the same message whether email exists or not
    res.status(200).json({
      message: 'If that email exists, a reset link has been sent',
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token, password } = req.body;
    await authService.resetPassword(token, password);
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    next(err);
  }
};

export const me = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.status(200).json({ admin: req.admin });
  } catch (err) {
    next(err);
  }
};