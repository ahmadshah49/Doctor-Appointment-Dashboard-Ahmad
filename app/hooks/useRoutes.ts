"use client";
import { usePathname } from "next/navigation";

import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import { PiUsers } from "react-icons/pi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";

import { useMemo } from "react";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: MdOutlineSpaceDashboard,
        active: pathname === "/dashboard",
      },
      {
        label: "Schedule",
        href: "/schedule",
        icon: RiCalendarScheduleLine,
        active: pathname === "/schedule",
      },
      {
        label: "Tasks",
        href: "/tasks",
        icon: BiTask,
        active: pathname === "/tasks",
      },
      {
        label: "Patients",
        href: "/patients",
        icon: PiUsers,
        active: pathname === "/patients",
      },
      {
        label: "Analytics",
        href: "/analytics",
        icon: TbBrandGoogleAnalytics,
        active: pathname === "/analytics",
      },
    ],
    [pathname]
  );
  return routes;
};
export default useRoutes;
