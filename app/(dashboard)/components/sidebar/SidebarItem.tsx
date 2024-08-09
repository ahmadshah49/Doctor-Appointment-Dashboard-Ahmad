import clsx from "clsx";
import Link from "next/link";
import React from "react";
interface SidebarItemProps {
  label: string;
  icon: any;
  href: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  href,
  active,
}) => {
  return (
    <li className="relative">
      {active && (
        <span className="w-[6px] rounded-r-2xl h-full absolute bg-primary" />
      )}
      <Link
        href={href}
        className={clsx(
          `flex group gap-2  py-2 min-h-[44px] text-gray-400 hover:text-gray-700`,
          active && "text-primary"
        )}
      >
        <Icon className="h-6 w-6 mx-5" />
        <span className="lg:block hidden">{label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
