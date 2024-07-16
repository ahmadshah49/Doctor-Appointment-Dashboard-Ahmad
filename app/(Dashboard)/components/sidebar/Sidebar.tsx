"use client";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import useRoutes from "@/app/hooks/useRoutes";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const routes = useRoutes();

  return (
    <div className="relative border-r h-screen bg-white">
      <div className="flex flex-col h-full">
        <div className="p-5 flex-shrink-0">
          <Image
            alt="Logo"
            src={Logo}
            height={40}
            width={160}
            layout="fixed"
            className="w-40"
          />
        </div>
        <div className="flex-grow mt-8 overflow-y-auto">
          <p className="font-normal text-xs text-gray-500 px-5">MENU</p>
          <ul role="list" className="mt-4">
            {routes.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                label={item.label}
                active={item.active}
                icon={item.icon}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
