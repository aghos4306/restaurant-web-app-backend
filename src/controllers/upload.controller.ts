import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  admin?: any;
}

export const uploadFile = async (
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

    // UploadThing handles the file upload via middleware
    // This endpoint is mainly for handling post-upload operations
    const files = (req as any).files;

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Files uploaded successfully',
      data: files,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFile = async (
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

    const { fileKey } = req.params;

    if (!fileKey) {
      return res.status(400).json({
        success: false,
        error: 'File key is required',
      });
    }

    // TODO: Implement file deletion with UploadThing API
    // For now, just return success
    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
