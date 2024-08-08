"use client";
import React from "react";
import { useEffect, useState } from "react";
import Input from "../../input/Input";
import Link from "next/link";
import Button from "../../button/Button";
import { useSession } from "next-auth/react";
import { redirect, useParams, useRouter } from "next/navigation";
import { updatePassword } from "@/app/action/updatePasswordAction";
import toast from "react-hot-toast";
import { resetFormProps } from "@/app/types/Type";

const ResetPasswordPage: React.FC<resetFormProps> = ({
  title,
  desc,
  link,
  path,
  param,
}) => {
  const router = useRouter();
  const { token } = useParams();
  const { status } = useSession();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (!password || !confirmPassword) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Password & Confirm password must be same");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be 6 charcter long");
      setLoading(false);
      return;
    }
    try {
      await updatePassword(password, token);
      console.log(password, token);
      toast.success("Password Changed🎉");
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Failed to reset password.");
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
            id="password"
            type="password"
            placeHolder="******"
            label="Enter new password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e)}
            disabled={loading}
          />
          <Input
            id="ConfirmPassword"
            type="password"
            placeHolder="******"
            label="Confirm password"
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e)}
            disabled={loading}
          />

          {error && <p className="text-sm text-red-500 italic">{error}</p>}
          <div className="py-6">
            <Button
              text={loading ? "Loading..." : "Submit"}
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

export default ResetPasswordPage;
