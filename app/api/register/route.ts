import { prisma } from "@/app/lib/prisma";
import { RegisterSchema } from "@/app/validator/authSchema";
import ErrorReporter from "@/app/validator/errorReporter";

import vine, { errors } from "@vinejs/vine";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const validator = vine.compile(RegisterSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);
    const hashedPassword = await bcrypt.hash(output.password, 12);
    const registerEmail = await prisma.user.findUnique({
      where: {
        email: output.email,
      },
    });

    if (registerEmail) {
      return NextResponse.json(
        { messsage: "Email Already Exist" },
        { status: 400 }
      );
    }

    const User = await prisma.user.create({
      data: {
        name: output.name,
        email: output.email,
        password: hashedPassword,
        companyName: body.companyName,
      },
    });
    return NextResponse.json({ message: "Register" }, { status: 200 });
  } 
  
  catch (error: any) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(error.messages, { status: 400 });
    }
    console.log("Registraion Error", error);
    return NextResponse.json("Error While Register", error);
  }
  
  };
