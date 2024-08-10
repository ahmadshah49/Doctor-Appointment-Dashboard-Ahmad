import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex items-center w-full">
        <div className="w-[20%]  h-screen fixed top-0 left-0">
          <Sidebar />
        </div>
        <div className=" w-[80%]  h-screen absolute right-0 top-0 ">
          <Navbar />
          <div className="bg-[#ededed]">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
