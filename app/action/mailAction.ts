"use server";
import { nanoid } from "nanoid";
import { prisma } from "../lib/prisma";

export async function mailAction(email: string) {
  try {
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingEmail) {
      throw new Error("Email does not exist!");
    }

    const token = nanoid(32);

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        resetToken: token,
      },
    });
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "ahmadraza.fsd.pk94@gmail.com",
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const htmlBody = `Click here to <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>`;

    const info = await transporter.sendMail({
      from: '"No Reply" <noreply@noreply.com>',

      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: http://localhost:3000/reset-password/${token}`,
      html: htmlBody,
    });

    return "Email sent successfully!";
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
}
