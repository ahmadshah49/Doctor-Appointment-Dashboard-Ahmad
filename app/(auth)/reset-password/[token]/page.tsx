import ResetPasswordPage from "@/app/components/auth/resetPasswordPage/ResetPasswordPage";
import SideDashboard from "@/app/components/auth/sideDashboard/SideDashboard";
import React from "react";

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
