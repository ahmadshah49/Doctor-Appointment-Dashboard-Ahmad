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
        href: "/dashboard/schedule",
        icon: RiCalendarScheduleLine,
        active: pathname === "/dashboard/schedule",
      },
      {
        label: "Tasks",
        href: "/dashboard/tasks",
        icon: BiTask,
        active: pathname === "/dashboard/tasks",
      },
      {
        label: "Patients",
        href: "/dashboard/patients",
        icon: PiUsers,
        active: pathname === "/dashboard/patients",
      },
      {
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: TbBrandGoogleAnalytics,
        active: pathname === "/dashboard/analytics",
      },
    ],
    [pathname]
  );
  return routes;
};
export default useRoutes;
