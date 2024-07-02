"use client";
import React from "react";
import { useEffect, useState } from "react";
import Input from "../Input";
import Link from "next/link";
import Button from "../buttons/Button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { mailAction } from "@/app/action/mailAction";
import toast from "react-hot-toast";

interface FormProps {
  title: string;
  desc: string;
  link?: string;
  path?: string;
}

const ResetPassword: React.FC<FormProps> = ({ title, desc, link, path }) => {
  const router = useRouter();
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await mailAction(email);
      toast.success("Reset link sent on your email");
      setEmail("");
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
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
