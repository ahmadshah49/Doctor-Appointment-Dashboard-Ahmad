"use client";
import { mailAction } from "@/app/action/mailAction";
import { useState } from "react";
import toast from "react-hot-toast";

export const useResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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
  return {
    email,
    loading,
    setLoading,
    error,
    submitHandler,
    setEmail,
  };
};
