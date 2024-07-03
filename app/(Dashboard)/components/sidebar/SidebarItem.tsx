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
    <li>
      <Link
        href={href}
        className={clsx(
          `flex group gap-4 py-4 my-4   `,
          active
            ? "border-l-8 rounded-lg  border-primary text-primary"
            : "text-gray-400 hover:text-gray-700 "
        )}
      >
        <Icon className="h-6 w-6" />
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
