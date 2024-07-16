import getCurrentUser from "@/app/action/getCurrentUser";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const currentUser = await getCurrentUser();
    console.log("currentuser", currentUser?.id);

    const body = await req.json();
    const { name, diagnosis, profileImage, status, appointmentDate } = body;

    if (!name || !diagnosis || !status || !appointmentDate) {
      return new NextResponse("Please add name,diagnosis and status", {
        status: 400,
      });
    }

    if (!currentUser) {
      return new NextResponse("UnAuthenticated");
    }

    await prisma.patient.create({
      data: {
        name: name,
        diagnosis: diagnosis,
        status: status,
        appointmentDate,
        profileImage,
        userId: currentUser?.id,
      },
    });

    return NextResponse.json(
      { message: "Patient details Added" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error while adding patient details", error);

    return NextResponse.json(
      { messgae: "Patient not added!", error },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const response = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        id: true,
        patients: {
          select: {
            name: true,
            diagnosis: true,
            userId: true,
            status: true,
            id: true,
            appointmentDate: true,
            profileImage: true,
          },
        },
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      message: "Error While Getting user data",
      error,
    });
  }
};



export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    await prisma.patient.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json({ message: "Patient Deleted" });
  } catch (error) {
    return NextResponse.json({
      message: "Error Deleting user",
      error,
    });
  }
};



export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    await prisma.patient.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        appointmentDate: body.appointmentDate,
        diagnosis: body.diagnosis,
        status: body.status,
        profileImage: body.profileImage,
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
