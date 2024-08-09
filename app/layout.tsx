import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import "./globals.css";
import Providers, { AuthProvider } from "./provider/Provider";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";

const inter = Mukta({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medicare Doctor Appointment Dashboard",
  description: "Doctor Appointment Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
