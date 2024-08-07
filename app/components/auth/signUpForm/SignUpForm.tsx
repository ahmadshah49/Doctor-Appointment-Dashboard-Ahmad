"use client";
import { useEffect, useState } from "react";
import Input from "../../input/Input";
import Link from "next/link";
import Button from "../../button/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SiGooglekeep } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface FormProps {
  title: string;
  desc: string;
  link?: string;
  path?: string;
}

const SignUpForm: React.FC<FormProps> = ({ title, desc, link, path }) => {
  const router = useRouter();
  const { status } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);
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
      const response = await axios.post("http://localhost:3000/api/register", {
        name,
        email,
        password,
        companyName,
      });
      console.log("Response", response);
      router.push("/");
    } catch (error: any) {
      console.log("Error while registering the user", error);
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
            id="name"
            type="text"
            placeHolder="John Doe"
            label="Name"
            name="name"
            value={name}
            disabled={loading}
            onChange={(e) => setName(e)}
          />
          <Input
            id="companyName"
            type="text"
            placeHolder="HealthCare Clinic"
            label="Company Name"
            name="companyName"
            value={companyName}
            disabled={loading}
            onChange={(e) => setCompanyName(e)}
          />

          <Input
            id="email"
            type="email"
            placeHolder="john@doe.com"
            label="Email"
            name="email"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e)}
          />
          <Input
            id="password"
            type="password"
            placeHolder="**********"
            label="Password"
            name="password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e)}
          />
          {error && <p className="text-sm text-red-500 italic">{error}</p>}
          <div className="py-6">
            <Button
              text={loading ? "Loading..." : "Sign Up"}
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

export default SignUpForm;
