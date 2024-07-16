import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getServerSession } from "next-auth";

type user = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  image?: string;
  companyName?: string;
  profileImage?: string;
};

type AuthState = {
  user: user;
};

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const session = await getServerSession(authOptions);
    return session?.user ?? null;
  }
);
