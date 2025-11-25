"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";

const BAD_WORDS = [
  "cazzo", "merda", "stronzo", "vaffanculo", "troia", "puttana", "bastardo", "coglion", "fanculo", "porco", "dio", "madonna"
];

function containsBadWords(text: string): boolean {
  const lowerText = text.toLowerCase();
  return BAD_WORDS.some(word => lowerText.includes(word));
}

export async function createSubmission(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;

  if (!title || !description || !type) {
    throw new Error("Missing fields");
  }

  // Content Check
  if (containsBadWords(title) || containsBadWords(description)) {
    throw new Error("Contenuto inappropriato rilevato.");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Rate Limiting (1 submission every 2 minutes)
  const lastSubmission = await prisma.submission.findFirst({
    where: { authorId: user.id },
    orderBy: { createdAt: "desc" },
  });

  if (lastSubmission) {
    const timeDiff = Date.now() - lastSubmission.createdAt.getTime();
    if (timeDiff < 2 * 60 * 1000) { // 2 minutes
      throw new Error(`Attendi ${Math.ceil((2 * 60 * 1000 - timeDiff) / 1000)} secondi prima di inviare una nuova segnalazione.`);
    }
  }

  await prisma.submission.create({
    data: {
      title,
      description,
      type,
      authorId: user.id,
    },
  });

  revalidatePath("/");
  return { success: true };
}

export async function deleteSubmission(id: number) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  const submission = await prisma.submission.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!submission) {
    throw new Error("Submission not found");
  }

  if (submission.author.email !== session.user.email) {
    throw new Error("Forbidden");
  }

  if (submission.status !== "PENDING") {
    throw new Error("Cannot delete processed submission");
  }

  await prisma.submission.delete({
    where: { id },
  });

  revalidatePath("/");
  return { success: true };
}
