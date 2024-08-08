import React from "react";
import ResetPassword from "../../components/auth/resetPassword/ResetPassword";
import SideDashboard from "../../components/auth/sideDashboard/SideDashboard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reset Password",
  description: "Medicare Doctor Appointment Dashboard ",
};
const ResetPage = () => {
  return (
    <div className="w-full h-screen flex justify-between ">
      <ResetPassword
        title="Reset Your Password"
        desc="Back to login page"
        link="Login"
        path="/"
      />
      <SideDashboard />
    </div>
  );
};

export default ResetPage;
