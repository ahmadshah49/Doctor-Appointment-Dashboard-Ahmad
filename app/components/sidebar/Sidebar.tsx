"use client";
import useRoutes from "@/app/hooks/useRoutes";
import Logo from "@/public/images/logo.png";
import sLogo from "@/public/svg/slLogo.svg";
import Image from "next/image";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const routes = useRoutes();
  const pathname = usePathname();
  const isActive = pathname === "/dashboard/settings";

  return (
    <>
      <div className="relative border-r w-full h-screen bg-white">
        <div className="flex flex-col h-full">
          <div className="w-full flex items-center justify-center border-b min-h-[64px] xl:h-[92px]  ">
            <div className="flex items-center gap-2 xl:min-w-[146px] xl:min-h-[62px] justify-center ">
              <Image
                alt="Logo"
                src={sLogo}
                height={200}
                width={200}
                layout="fixed"
                className="w-full xl:max-w-[47px] xl:max-h-[47px] lg:block hidden"
              />
              <h1 className="text-primary  lg:text-[27px] xl:text-[37px] lg:block hidden">
                Medicare
              </h1>
            </div>
            <Image
              alt="Small Logo"
              src={sLogo}
              height={200}
              width={200}
              layout="fixed"
              className="w-fit lg:hidden block "
            />
          </div>
          <div className="flex-grow mt-[30px] overflow-y-auto">
            <p className="font-normal xl:pl-[20px] text-base text-gray-500 lg:px-5 md:px-3 px-[6px]">
              MENU
            </p>
            <ul role="list" className="mt-4 flex flex-col gap-2 ">
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
            <div className="border-t  border-gray-300 mt-[24px] mb-[35px] h-5 xl:min-w-[168px] w-[50%] mx-auto" />
            <p className="font-normal text-base text-gray-500 mt-1 lg:px-5 md:px-3 px-[6px]">
              GENERAL
            </p>
            <div>
              <Link
                href={"/dashboard/settings"}
                className={clsx(
                  `flex 
                items-center
                group
                min-h-[44px]
                gap-2
                my-4
                py-2
              text-gray-400
              hover:text-gray-700`,
                  isActive && "text-primary "
                )}
              >
                {isActive && (
                  <span className="w-[6px] rounded-r-2xl absolute h-[40px]  bg-primary" />
                )}
                <IoSettingsOutline className="h-6 w-6 ml-5" />{" "}
                <p className="lg:block hidden">Settings</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="lg:hidden block w-full h-11 bg-black"></div> */}
    </>
  );
};

export default Sidebar;
