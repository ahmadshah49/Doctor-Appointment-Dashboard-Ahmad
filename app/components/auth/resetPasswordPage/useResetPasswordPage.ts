"use client";
import { updatePassword } from "@/app/action/updatePasswordAction";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useResetPasswordPage = () => {
  const router = useRouter();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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
  return {
    submitHandler,
    password,
    confirmPassword,
    loading,
    error,
    setPassword,
    setConfirmPassword,
  };
};
