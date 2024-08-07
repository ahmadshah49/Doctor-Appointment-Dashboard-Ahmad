import LoginForm from "./components/auth/loginForm/LoginForm";
import SideDashboard from "./components/auth/sideDashboard/SideDashboard";

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
