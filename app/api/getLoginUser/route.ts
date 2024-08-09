import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/app/lib/authOptions";

export const GET = async (req: Request, res: Response) => {
  const session = await getServerSession(authOptions);
  try {
    if (!session || !session.user || !session.user.email) {
      return new NextResponse("Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        companyName: true,
        profileImage: true,
        resetToken: true,
        resetTokenExpiry: true,
        emailVerified: true,
      },
    });
    if (!user) {
      return new NextResponse("User not found");
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.log("Error", error);
    return NextResponse.json({
      message: "Error While Geting Session Data",
      error: error.message,
    });
  }
};
