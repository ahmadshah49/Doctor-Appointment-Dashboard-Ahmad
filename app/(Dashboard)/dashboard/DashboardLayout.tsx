import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex items-center w-full">
        <Sidebar />
        <div className="w-full h-screen">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
