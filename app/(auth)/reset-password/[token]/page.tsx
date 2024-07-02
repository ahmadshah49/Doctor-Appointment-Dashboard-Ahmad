import ResetPasswordPage from "@/app/components/auth/ResetPasswordPage";
import SideDashboard from "@/app/components/auth/SideDashboard";
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
