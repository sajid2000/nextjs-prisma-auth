import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import ValidationError from "@/lib/errors/ValidationError";

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({ where: { id } });
  } catch {
    return null;
  }
};

export const getAccountByUserId = async (userId: string) => {
  try {
    return await db.account.findFirst({
      where: { userId },
    });
  } catch {
    return null;
  }
};

export const createUser = async (data: { email: string; name: string; password: string }) => {
  const { email, name, password } = data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new ValidationError({ email: ["Email already in use!"] });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  return db.user.create({ data: { name, email, password: hashedPassword } });
};

export const updateUser = async (userId: string, data: Prisma.UserUpdateInput) => {
  await db.user.update({ where: { id: userId }, data });
};
