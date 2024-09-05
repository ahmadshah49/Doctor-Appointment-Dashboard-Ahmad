"use client";
import { FormProps } from "@/app/types/Type";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Button from "../../button/Button";
import Input from "../../input/Input";
import { useLoginForm } from "./useLoginForm";

const LoginForm: React.FC<FormProps> = ({ title, desc, link, path }) => {
  const {
    email,
    googleAction,
    password,
    submitHandler,
    setEmail,
    setPassword,
    error,
    loading,
  } = useLoginForm();

  return (
    <div className="w-full md:w-3/5 h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-full h-full bg-white flex flex-col items-start justify-center px-6">
        <div className="py-2">
          <h1 className="md:text-3xl font-normal text-4xl py-3 primary:text-4xl">
            {title}
          </h1>
          <p className="text-sm font-normal">
            {desc}
            {path && link && (
              <Link
                className="text-primary font-bold mx-1 border-b border-primary"
                href={path}
              >
                {link}
              </Link>
            )}
          </p>
        </div>
        <form onSubmit={submitHandler} className="mt-6 w-full">
          <Input
            id="email"
            type="email"
            placeHolder="John@Doe.com"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e)}
            disabled={loading}
          />
          <Input
            id="password"
            type="password"
            placeHolder="**********"
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e)}
            disabled={loading}
          />
          <div className="flex justify-end">
            <Link
              href={"/reset"}
              className="font-bold text-sm hover:underline text-end w-full text-primary"
            >
              Forgot Password
            </Link>
          </div>
          {error && <p className="text-sm text-red-500 italic">{error}</p>}
          <div className="py-6">
            <Button
              text={loading ? "Loading..." : "Login"}
              widthFull
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
        <div className="flex flex-col justify-center my-4 w-full items-center">
          <div className="w-full flex items-center ">
            <span className="text-gray-600 h-1 border-t border-gray-500 w-full" />
            <span className="px-2 ">or</span>
            <span className="text-gray-600 h-1 border-t border-gray-500 w-full" />
          </div>

          <Button
            text={"Continue with Google"}
            widthFull
            type="button"
            transparent
            icon={FcGoogle}
            onClick={googleAction}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
