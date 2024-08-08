import { Metadata } from "next";
import LoginForm from "./components/auth/loginForm/LoginForm";
import SideDashboard from "./components/auth/sideDashboard/SideDashboard";
export const metadata: Metadata = {
  title: "Login in To Dashboard",
  description: "Medicare Doctor Appointment Dashboard ",
};
export default function Home() {
  return (
    <>
      <div className="w-full h-screen flex justify-between ">
        <LoginForm
          title="Login Here"
          desc="Don't Have an Account"
          link="Sign up"
          path="/signup"
        />
        <SideDashboard />
      </div>
    </>
  );
}
