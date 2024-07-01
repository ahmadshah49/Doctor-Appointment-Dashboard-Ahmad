import LoginForm from "@/app/components/auth/LoginForm";
import SideDashboard from "@/app/components/auth/SideDashboard";
import React from "react";

const login = () => {
  return (
    <div className="w-full h-screen flex justify-between ">
      <LoginForm
        title="Login Here"
        desc="Don't Have an Account"
        link="Sign up"
        path="/signup"
      />
      <SideDashboard />
    </div>
  );
};

export default login;
