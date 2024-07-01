"use client";
import { useEffect, useState } from "react";
import Input from "../Input";
import Link from "next/link";
import Button from "../buttons/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormProps {
  title: string;
  desc: string;
  link?: string;
  path?: string;
}

const SignUpForm: React.FC<FormProps> = ({ title, desc, link, path }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        name,
        email,
        password,
      });
      console.log("Response", response);
      router.push("/login");
    } catch (error) {
      console.log("Error While Register the user", error);
    }
  };

  return (
    <div className="w-full md:w-3/5  h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-full h-full bg-white flex flex-col items-start justify-center  px-6">
        <div className="py-2">
          <h1 className="md:text-3xl font-normal text-4xl py-3 primary:text-4xl">
            {title}
          </h1>
          <p className="text-sm font-normal">
            {desc}
            {path && (
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
            placeHolder="Jhon Doe"
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e)}
          />
          <Input
            id="email"
            type="email"
            placeHolder="Jhon@Doe.com"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e)}
          />
          <Input
            id="password"
            type="password"
            placeHolder="**********"
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e)}
          />

          <div className="py-6">
            <Button text="Sign Up" widthFull type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
