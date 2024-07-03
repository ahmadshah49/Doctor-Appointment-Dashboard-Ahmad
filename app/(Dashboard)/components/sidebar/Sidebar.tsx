"use client";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import useRoutes from "@/app/hooks/useRoutes";
import SidebarItem from "./SidebarItem";
const Sidebar = () => {
  const routes = useRoutes();
  return (
    <div className="w-80 border-r h-screen ">
      <div className="p-2">
        <Image
          alt="Logo"
          src={Logo}
          height={500}
          width={500}
          className="w-40 "
        />
        <div className="mt-16">
          <p className="font-normal text-xs text-gray-500"> MENU</p>

          <ul role="list">
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
