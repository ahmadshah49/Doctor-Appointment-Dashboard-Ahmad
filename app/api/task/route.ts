import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { title, description, completed, date } = body;
    if (!currentUser) {
      return new NextResponse("Unauthenticated!");
    }

    if (!title && !completed) {
      return new NextResponse(
        "Please add title,description,completed and Date"
      );
    }
    const task = await prisma.task.create({
      data: {
        title,
        completed,
        description,
        date,
        userId: currentUser?.id,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ message: "Error while adding task", error });
  }
};

export const GET = async (req: Request) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = currentUser.id;
    const response = await prisma.task.findMany({
      where: { userId },
      orderBy: {
        date: "desc",
      },
      select: {
        title: true,
        completed: true,
        date: true,
        description: true,
        id: true,

        userId: true,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      message: "Error While Getting Task data",
      error,
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    await prisma.task.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json({ message: "Task Deleted" });
  } catch (error) {
    return NextResponse.json({
      message: "Error Deleting Task",
      error,
    });
  }
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    await prisma.task.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        description: body.description,
        date: body.date,
        completed: body.completed,
      },
    });
    return NextResponse.json({ message: "Patient Updated" });
  } catch (error) {
    return NextResponse.json({
      message: "Error Updating Patient",
      error,
    });
  }
};
