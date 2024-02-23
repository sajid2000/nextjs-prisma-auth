import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { getServerUser } from "@/lib/nextauth";

export async function GET() {
  const user = await getServerUser();

  if (user?.role === UserRole.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}
