import { db } from "@/lib/db";

type TokenCreatePayload = { email: string; token: string; expires: Date };

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const createPasswordResetToken = async ({ email, token, expires }: TokenCreatePayload) => {
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  return db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};

export const deletePasswordResetToken = async (id: string) => {
  return db.passwordResetToken.delete({ where: { id } });
};

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};

export const createTwoFactorConfirmation = async (userId: string) => {
  return db.twoFactorConfirmation.create({ data: { userId } });
};

export const deleteTwoFactorConfirmation = async (id: string) => {
  return db.twoFactorConfirmation.delete({ where: { id } });
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const createVerificationToken = async ({ email, token, expires }: TokenCreatePayload) => {
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  return db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};

export const deleteVerificationToken = async (id: string) => {
  return db.verificationToken.delete({ where: { id } });
};

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

export const createTwoFactorToken = async ({ email, token, expires }: TokenCreatePayload) => {
  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await deleteTwoFactorToken(existingToken.id);
  }

  return db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
};

export const deleteTwoFactorToken = async (id: string) => {
  return db.twoFactorToken.delete({ where: { id } });
};
