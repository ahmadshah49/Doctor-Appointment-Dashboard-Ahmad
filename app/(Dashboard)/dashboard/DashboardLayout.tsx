import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center w-full">
      <div className="w-[20%] h-screen">
        <Sidebar />
      </div>
      <div className=" w-[80%] h-screen">
        <Navbar />
        {children}  
      </div>
    </div>
  );
};

export default DashboardLayout;
