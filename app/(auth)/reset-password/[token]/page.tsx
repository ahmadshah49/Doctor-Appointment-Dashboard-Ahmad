import ResetPasswordPage from "@/app/components/auth/resetPasswordPage/ResetPasswordPage";
import SideDashboard from "@/app/components/auth/sideDashboard/SideDashboard";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "New Password",
  description: "Medicare Doctor Appointment Dashboard ",
};
const ResetPassword = () => {
  return (
    <div className="w-full h-screen flex justify-between ">
      <ResetPasswordPage
        title="Enter Your New Password"
        desc="Back to login page"
        link="Login"
        path="/"
      />
      <SideDashboard />
    </div>
  );
};

export default ResetPassword;
