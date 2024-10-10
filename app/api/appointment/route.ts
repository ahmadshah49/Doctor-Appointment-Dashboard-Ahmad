import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await prisma.appointment.create({
      data: {
        appointmentType: body.appointmentType,
        name: body.name,
        start: new Date(body.start),
        end: new Date(body.end),
        purpose: body.purpose,
        status: body.status,
        userId: currentUser?.id,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error Adding Appointment!", error },
      {
        status: 400,
      }
    );
  }
};
export const GET = async (req: Request) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = currentUser?.id;
    const data = await prisma.appointment.findMany({
      where: { userId },

      orderBy: {
        start: "desc",
      },
      select: {
        appointmentType: true,
        start: true,
        end: true,
        id: true,
        purpose: true,
        name: true,
        status: true,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json("Error Getting Appointment!", { status: 400 });
  }
};
export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const data = await prisma.appointment.updateMany({
      where: {
        id: body.id,
      },
      data: {
        appointmentType: body.appointmentType,
        end: body.end,
        name: body.name,
        purpose: body.purpose,
        start: body.start,
        status: body.status,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "Error Updating Appointment",
      error,
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    await prisma.appointment.delete({
      where: { id: body.id },
    });
    return NextResponse.json("Appointment Deleted", { status: 200 });
  } catch (error) {
    return NextResponse.json("Error Deleting Appointment!", { status: 400 });
  }
};
