import SideDashboard from "@/app/components/auth/SideDashboard";
import SignUpForm from "@/app/components/auth/SignUpForm";
import React from "react";

const signup = () => {
  return (
    <div className="w-full  h-screen flex justify-between ">
      <SignUpForm
        title="Sign Up Here"
        desc="Already Have an Account"
        link="Login"
        path="/login"
      />
      <SideDashboard />
    </div>
  );
};

export default signup;
