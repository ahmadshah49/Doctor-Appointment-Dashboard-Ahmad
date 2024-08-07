import SideDashboard from "@/app/components/auth/sideDashboard/SideDashboard";
import SignUpForm from "@/app/components/auth/signUpForm/SignUpForm";
import React from "react";

const signup = () => {
  return (
    <div className="w-full  h-screen flex justify-between ">
      <SignUpForm
        title="Sign Up Here"
        desc="Already Have an Account"
        link="Login"
        path="/"
      />
      <SideDashboard />
    </div>
  );
};

export default signup;
