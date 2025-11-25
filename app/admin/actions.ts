"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateStatus(id: number, status: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.admin) {
    throw new Error("Unauthorized");
  }

  await prisma.submission.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin");
}
