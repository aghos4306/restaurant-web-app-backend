import { prisma } from '../config/database';
import { hashPassword } from '../utils/password';

export interface CreateAdminInput {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdateAdminInput {
  name?: string;
  email?: string;
  role?: string;
  isActive?: boolean;
}

export const getAllAdmins = async (
  limit: number = 20,
  offset: number = 0
): Promise<{ admins: any[]; total: number }> => {
  const [admins, total] = await Promise.all([
    prisma.admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.admin.count(),
  ]);

  return { admins, total };
};

export const getAdminById = async (id: string): Promise<any | null> => {
  return prisma.admin.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getAdminByEmail = async (email: string): Promise<any | null> => {
  return prisma.admin.findUnique({
    where: { email },
  });
};

export const createAdmin = async (data: CreateAdminInput): Promise<any> => {
  // Check if email already exists
  const existing = await prisma.admin.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    throw new Error('An admin with this email already exists');
  }

  const passwordHash = await hashPassword(data.password);

  const admin = await prisma.admin.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
      role: (data.role as any) || 'ADMIN',
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return admin;
};

export const updateAdmin = async (
  id: string,
  data: UpdateAdminInput
): Promise<any> => {
  const admin = await prisma.admin.findUnique({ where: { id } });

  if (!admin) {
    throw new Error('Admin not found');
  }

  // Check email uniqueness if email is being updated
  if (data.email && data.email !== admin.email) {
    const existing = await prisma.admin.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      throw new Error('An admin with this email already exists');
    }
  }

  const updated = await prisma.admin.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      role: (data.role as any),
      isActive: data.isActive,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updated;
};

export const deleteAdmin = async (id: string): Promise<any> => {
  const admin = await prisma.admin.findUnique({ where: { id } });

  if (!admin) {
    throw new Error('Admin not found');
  }

  const deleted = await prisma.admin.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return deleted;
};

export const changeAdminPassword = async (
  id: string,
  newPassword: string
): Promise<void> => {
  const admin = await prisma.admin.findUnique({ where: { id } });

  if (!admin) {
    throw new Error('Admin not found');
  }

  const passwordHash = await hashPassword(newPassword);

  await prisma.admin.update({
    where: { id },
    data: { passwordHash },
  });
};
