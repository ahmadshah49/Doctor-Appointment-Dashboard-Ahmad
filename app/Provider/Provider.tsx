"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import React from "react";
import { SessionProvider } from "next-auth/react";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Provider;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
