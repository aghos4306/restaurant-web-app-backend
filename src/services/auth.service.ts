import crypto from 'crypto';
import { prisma } from '../config/database';
import { hashPassword, comparePassword } from '../utils/password';
import { signToken } from '../utils/jwt';
import { sendPasswordResetEmail } from './email.service';
import { createError } from '../middleware/error.middleware';

export const loginAdmin = async (email: string, password: string) => {
  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin || !admin.isActive) {
    throw createError('Invalid credentials', 401);
  }

  const valid = await comparePassword(password, admin.passwordHash);
  if (!valid) {
    throw createError('Invalid credentials', 401);
  }

  const token = signToken({
    id: admin.id,
    email: admin.email,
    role: admin.role,
    name: admin.name,
  });

  return {
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  };
};

export const signupAdmin = async (
  name: string,
  email: string,
  password: string,
  role: 'SUPER_ADMIN' | 'ADMIN' = 'ADMIN'
) => {
  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    throw createError('Email already in use', 409);
  }

  const passwordHash = await hashPassword(password);

  const admin = await prisma.admin.create({
    data: { name, email, passwordHash, role },
    select: { id: true, name: true, email: true, role: true },
  });

  return admin;
};

export const forgotPassword = async (email: string) => {
  const admin = await prisma.admin.findUnique({ where: { email } });

  // Always return success even if email not found
  // This prevents email enumeration attacks
  if (!admin || !admin.isActive) return;

  // Invalidate any existing unused tokens for this admin
  await prisma.passwordResetToken.updateMany({
    where: { adminId: admin.id, used: false },
    data: { used: true },
  });

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(
    Date.now() +
    Number(process.env.RESET_TOKEN_EXPIRES_MINUTES) * 60 * 1000
  );

  await prisma.passwordResetToken.create({
    data: { adminId: admin.id, token, expiresAt },
  });

  const resetUrl = `${process.env.ADMIN_URL}/reset-password?token=${token}`;
  await sendPasswordResetEmail(admin.email, admin.name, resetUrl);
};

export const resetPassword = async (token: string, newPassword: string) => {
  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { admin: true },
  });

  if (!record || record.used || record.expiresAt < new Date()) {
    throw createError('Invalid or expired reset token', 400);
  }

  const passwordHash = await hashPassword(newPassword);

  await prisma.$transaction([
    prisma.admin.update({
      where: { id: record.adminId },
      data: { passwordHash },
    }),
    prisma.passwordResetToken.update({
      where: { id: record.id },
      data: { used: true },
    }),
  ]);
};