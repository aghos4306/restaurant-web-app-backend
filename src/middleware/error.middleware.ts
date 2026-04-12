import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
}

// Global error handler — catches anything thrown in controllers
// Must have 4 parameters for Express to treat it as an error handler
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction  // eslint-disable-line @typescript-eslint/no-unused-vars
): void => {
  const statusCode = err.statusCode ?? 500;
  const message =
    process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal server error'
      : err.message;

  console.error(`[${new Date().toISOString()}] ${err.stack}`);

  res.status(statusCode).json({ message });
};

// Creates a typed error with a status code
export const createError = (message: string, statusCode: number): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  return error;
};