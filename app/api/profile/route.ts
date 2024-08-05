import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const body = await req.json();
  const { name, email, companyName, id } = body;
  try {
    const data = await prisma.user.updateMany({
      where: { id },
      data: {
        name,
        email,
        companyName,
      },
    });
    return NextResponse.json("Profile Updated!");
  } catch (error: any) {
    console.log("Error", error);

    return NextResponse.json("Error", error);
  }
};
