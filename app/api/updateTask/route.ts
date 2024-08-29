import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const { id, completed } = await body;
    if (!id || !completed) {
      return NextResponse.json("Missing id or completed field", {
        status: 400,
      });
    }

    await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        completed: completed,
      },
    });
    return NextResponse.json("Task Updated");
  } catch (error: any) {
    return NextResponse.json("Error", error);
  }
};
