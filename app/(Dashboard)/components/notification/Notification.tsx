"use client";

import { getNotification } from "@/app/redux/slices/notificationsSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const disPatch: AppDispatch = useDispatch();
  const { data, isError, isLoading } = useSelector(
    (state: RootState) => state.notifications
  );

  useEffect(() => {
    disPatch(getNotification());
  }, [disPatch]);

  return (
    <div className="relative">
      <div className="flex flex-col mt-4 gap-2">
        {data.map((notification, index) => (
          <div
            className={clsx(
              `border hover:bg-primary/20 transition-all  p-2 rounded-md`
            )}
            key={index}
          >
            {notification.data}
          </div>
        ))}
        <Link
          href={"/dashboard/notifications"}
          className=" text-primary underline text-right sticky  z-50  right-2 -bottom-2 font-medium bg-white py-1"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default Notification;
