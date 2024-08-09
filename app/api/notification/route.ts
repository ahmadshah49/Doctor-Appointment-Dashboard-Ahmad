import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();
  const body = await req.json();
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const data = await prisma.notification.create({
      data: {
        data: body.data,
        userId: currentUser?.id,
      },
    });

    return NextResponse.json({ message: "Notification Add!", data });
  } catch (error: any) {
    return NextResponse.json("Error", error);
  }
};

export const GET = async () => {
  try {
    const currentUser = await getCurrentUser();

    const userId = currentUser?.id;
    const response = await prisma.notification.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        data: true,
        createdAt: true,
        id: true,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      message: "Error While Getting Notification Data",
      error,
    });
  }
};
