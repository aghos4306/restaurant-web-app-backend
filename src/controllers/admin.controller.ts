import { Request, Response, NextFunction } from 'express';
import * as adminService from '../services/admin.service';

interface AuthRequest extends Request {
  admin?: any;
}

export const getAdmins = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const offset = Number(req.query.offset) || 0;

    const { admins, total } = await adminService.getAllAdmins(limit, offset);

    res.json({
      success: true,
      data: admins,
      pagination: {
        limit,
        offset,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const id = req.params.id as string;
    const admin = await adminService.getAdminById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: 'Admin not found',
      });
    }

    res.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

export const createAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const { name, email, password, role } = req.body;

    const admin = await adminService.createAdmin({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      data: admin,
      message: 'Admin created successfully',
    });
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      return res.status(409).json({
        success: false,
        error: error.message,
      });
    }
    next(error);
  }
};

export const updateAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const id = req.params.id as string;
    const { name, email, role, isActive } = req.body;

    const admin = await adminService.updateAdmin(id, {
      name,
      email,
      role,
      isActive,
    });

    res.json({
      success: true,
      data: admin,
      message: 'Admin updated successfully',
    });
  } catch (error: any) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }
    if (error.message.includes('already exists')) {
      return res.status(409).json({
        success: false,
        error: error.message,
      });
    }
    next(error);
  }
};

export const deleteAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const id = req.params.id as string;
    const admin = await adminService.deleteAdmin(id);

    res.json({
      success: true,
      data: admin,
      message: 'Admin deleted successfully',
    });
  } catch (error: any) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }
    next(error);
  }
};

export const changePassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const id = req.params.id as string;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 8 characters long',
      });
    }

    await adminService.changeAdminPassword(id, newPassword);

    res.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error: any) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }
    next(error);
  }
};
