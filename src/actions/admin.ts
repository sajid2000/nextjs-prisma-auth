"use server";

import { UserRole } from "@prisma/client";

import { getServerUser } from "@/lib/nextauth";

export const admin = async () => {
  const user = await getServerUser();

  if (user?.role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" };
};
