"use client";
import { resetFormProps } from "@/app/types/Type";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Button from "../../button/Button";
import Input from "../../input/Input";
import { useResetPasswordPage } from "./useResetPasswordPage";

const ResetPasswordPage: React.FC<resetFormProps> = ({
  title,
  desc,
  link,
  path,
  param,
}) => {
  const {
    confirmPassword,
    error,
    loading,
    password,
    setConfirmPassword,
    setPassword,
    submitHandler,
  } = useResetPasswordPage();

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
