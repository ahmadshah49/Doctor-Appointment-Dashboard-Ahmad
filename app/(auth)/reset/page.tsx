import React from "react";
import ResetPassword from "../../components/auth/ResetPassword";
import SideDashboard from "../../components/auth/SideDashboard";
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
