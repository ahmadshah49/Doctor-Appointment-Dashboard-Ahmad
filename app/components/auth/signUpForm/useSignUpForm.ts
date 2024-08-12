"use client";

import { BASE_URL } from "@/app/utils/axiosInstance";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useSignUpForm = () => {
  const router = useRouter();
  const { status } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !name || !password || !companyName) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      // const response = await AxiosInstance.post("/register", {
      //   name,
      //   email,
      //   password,
      //   companyName,
      // });
      axios.post(`${BASE_URL}/api/register`, {
        name,
        email,
        password,
        companyName,
      });
      router.push("/");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          (error.response && error.response.status === 400
            ? "Email is already registered"
            : "Registration failed. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };
  const googleAction = () => {
    signIn("google", { redirect: false }).then((callback) => {
      if (callback?.error) {
        setError("Invalid Credentials");
      }
      if (callback?.ok && !callback?.error) {
        toast("Logged in", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    });
  };
  return {
    name,
    email,
    password,
    companyName,
    loading,
    error,
    setName,
    setEmail,
    setPassword,
    setCompanyName,
    setLoading,
    setError,
    submitHandler,
    googleAction,
  };
};
