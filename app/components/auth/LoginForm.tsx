"use client";
import { useEffect, useState } from "react";
import Input from "../Input";
import Link from "next/link";
import Button from "../buttons/Button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

interface FormProps {
  title: string;
  desc: string;
  link?: string;
  path?: string;
}

const LoginForm: React.FC<FormProps> = ({ title, desc, link, path }) => {
  const router = useRouter();
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        alert("Logged in");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Error during sign-in", err);
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
      if (callback?.ok && !callback?.error) {
        // toast success logged in
        alert("logged in");
      }
    });
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
            text={loading ? "Loading..." : "Continue with Google"}
            widthFull
            type="button"
            disabled={loading}
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
