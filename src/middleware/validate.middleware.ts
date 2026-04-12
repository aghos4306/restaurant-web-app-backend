import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

// Validates request body against a Zod schema
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error: any) {
      res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      });
    }
  };
};
