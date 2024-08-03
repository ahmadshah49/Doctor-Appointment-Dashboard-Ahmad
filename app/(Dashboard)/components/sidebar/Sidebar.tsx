"use client";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import useRoutes from "@/app/hooks/useRoutes";
import SidebarItem from "./SidebarItem";
import Link from "next/link";
import clsx from "clsx";
import { IoSettingsOutline } from "react-icons/io5";

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
          <ul role="list" className="mt-4 ">
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
          <div className="border-t  border-gray-200 my-8 h-5 w-[50%] mx-auto" />
          <p className="font-normal text-xs text-gray-500 px-5">GENERAL</p>
          <div>
            <Link
              href={"/dashboard/settings"}

              className={clsx(
                `flex group
                gap-2
              active:text-primary
                my-4
                py-2
              text-gray-400
              hover:text-gray-700`
              )}
            >
              <IoSettingsOutline className="h-6 w-6 mx-5" /> Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
