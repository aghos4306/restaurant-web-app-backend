import { Request, Response, NextFunction } from 'express';
import * as newsService from '../services/news.service';

interface AuthRequest extends Request {
  admin?: any;
}

export const getAllNews = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const offset = Number(req.query.offset) || 0;
    const published = req.query.published !== 'false';

    const { news, total } = await newsService.getAllNews(published, limit, offset);

    res.json({
      success: true,
      data: news,
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

export const getNewsById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string;
    const news = await newsService.getNewsById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        error: 'News post not found',
      });
    }

    res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

export const getNewsBySlug = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = req.params.slug as string;
    const news = await newsService.getNewsBySlug(slug);

    if (!news) {
      return res.status(404).json({
        success: false,
        error: 'News post not found',
      });
    }

    res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

export const createNews = async (
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

    const { title, body, slug, coverMediaUrl, coverMediaType, status } = req.body;

    const news = await newsService.createNews({
      title,
      body,
      slug,
      publisherId: req.admin.id,
      coverMediaUrl,
      coverMediaType,
      status,
    });

    res.status(201).json({
      success: true,
      data: news,
      message: 'News post created successfully',
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

export const updateNews = async (
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
    const { title, body, slug, coverMediaUrl, coverMediaType, status } = req.body;

    const news = await newsService.updateNews(id, {
      title,
      body,
      slug,
      coverMediaUrl,
      coverMediaType,
      status,
    });

    res.json({
      success: true,
      data: news,
      message: 'News post updated successfully',
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

export const deleteNews = async (
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
    const news = await newsService.deleteNews(id);

    res.json({
      success: true,
      data: news,
      message: 'News post deleted successfully',
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

export const publishNews = async (
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
    const news = await newsService.publishNews(id);

    res.json({
      success: true,
      data: news,
      message: 'News post published successfully',
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
