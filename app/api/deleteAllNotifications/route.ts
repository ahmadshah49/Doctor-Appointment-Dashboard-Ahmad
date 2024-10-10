import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    const currentUser = await getCurrentUser();
    const response = await prisma.notification.deleteMany({
      where: {
        userId: currentUser?.id,
      },
    });
    return NextResponse.json("All Notifications Deleted");
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error While Deleting All Notifications",
      error,
    });
  }
};
