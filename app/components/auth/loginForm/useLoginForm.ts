"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export const useLoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!email || !password) {
      setError("Please fill all fields");
    }
    try {
      const callback = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (callback?.error) {
        setError("Invalid Credentials");
      } else if (callback?.ok) {
        toast("Redirecting to dashboard", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const googleAction = () => {
    signIn("google", { redirect: false }).then((callback) => {
      if (callback?.error) {
        setError("Invalid Credentials");
      }
      toast("Redirecting to dashboard", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    });
  };

  return {
    submitHandler,
    email,
    password,
    setEmail,
    setPassword,
    googleAction,
    loading,
    error,
  };
};
