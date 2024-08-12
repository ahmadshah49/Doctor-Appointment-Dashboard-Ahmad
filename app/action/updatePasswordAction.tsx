"use server";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
export async function updatePassword(
  password: string,
  token: string[] | string
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.updateMany({
    where: {
      resetToken: token as string,
    },
    data: {
      password: hashedPassword,
    },
  });
}
