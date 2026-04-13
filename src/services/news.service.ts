import { prisma } from '../config/database';

export interface CreateNewsInput {
  title: string;
  body: string;
  slug: string;
  publisherId: string;
  coverMediaUrl?: string;
  coverMediaType?: 'IMAGE' | 'VIDEO';
  status?: 'DRAFT' | 'PUBLISHED';
}

export interface UpdateNewsInput {
  title?: string;
  body?: string;
  slug?: string;
  coverMediaUrl?: string | null;
  coverMediaType?: 'IMAGE' | 'VIDEO' | null;
  status?: 'DRAFT' | 'PUBLISHED';
}

export const getAllNews = async (
  published: boolean = true,
  limit: number = 20,
  offset: number = 0
): Promise<{ news: any[]; total: number }> => {
  const where = published ? { status: 'PUBLISHED' as const } : undefined;
  
  const [news, total] = await Promise.all([
    prisma.newsPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.newsPost.count({ where }),
  ]);

  return { news, total };
};

export const getNewsById = async (id: string): Promise<any | null> => {
  return prisma.newsPost.findUnique({
    where: { id },
  });
};

export const getNewsBySlug = async (slug: string): Promise<any | null> => {
  return prisma.newsPost.findUnique({
    where: { slug },
  });
};

export const createNews = async (data: CreateNewsInput): Promise<any> => {
  // Check for duplicate slug
  const existing = await prisma.newsPost.findUnique({
    where: { slug: data.slug },
  });

  if (existing) {
    throw new Error('A news post with this slug already exists');
  }

  return prisma.newsPost.create({
    data: {
      title: data.title,
      body: data.body,
      slug: data.slug,
      publisherId: data.publisherId,
      coverMediaUrl: data.coverMediaUrl,
      coverMediaType: (data.coverMediaType as any) || 'IMAGE',
      status: (data.status as any) || 'DRAFT',
    },
  });
};

export const updateNews = async (
  id: string,
  data: UpdateNewsInput
): Promise<any> => {
  const post = await prisma.newsPost.findUnique({ where: { id } });

  if (!post) {
    throw new Error('News post not found');
  }

  // Check slug uniqueness if slug is being updated
  if (data.slug && data.slug !== post.slug) {
    const existing = await prisma.newsPost.findUnique({
      where: { slug: data.slug },
    });
    if (existing) {
      throw new Error('A news post with this slug already exists');
    }
  }

  return prisma.newsPost.update({
    where: { id },
    data: {
      title: data.title,
      body: data.body,
      slug: data.slug,
      coverMediaUrl: data.coverMediaUrl,
      coverMediaType: (data.coverMediaType as any),
      status: (data.status as any),
    },
  });
};

export const deleteNews = async (id: string): Promise<any> => {
  const post = await prisma.newsPost.findUnique({ where: { id } });

  if (!post) {
    throw new Error('News post not found');
  }

  return prisma.newsPost.delete({
    where: { id },
  });
};

export const publishNews = async (id: string): Promise<any> => {
  const post = await prisma.newsPost.findUnique({ where: { id } });

  if (!post) {
    throw new Error('News post not found');
  }

  return prisma.newsPost.update({
    where: { id },
    data: { status: 'PUBLISHED', publishedAt: new Date() },
  });
};
