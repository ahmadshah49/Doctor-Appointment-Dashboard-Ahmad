"use client";
import { FormProps } from "@/app/types/Type";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Button from "../../button/Button";
import Input from "../../input/Input";
import { useResetPassword } from "./useResetPassword";

const ResetPassword: React.FC<FormProps> = ({ title, desc, link, path }) => {
  const router = useRouter();
  const { status } = useSession();
  const { email, error, loading, submitHandler, setEmail } = useResetPassword();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

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
            label="Enter Your registered Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e)}
            disabled={loading}
          />

          {error && <p className="text-sm text-red-500 italic">{error}</p>}
          <div className="py-6">
            <Button
              text={loading ? "Loading..." : "Send"}
              widthFull
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
