"use client";

import { getNotification } from "@/app/redux/slices/notificationsSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";

const Notification = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, isError, isLoading } = useSelector(
    (state: RootState) => state.notifications
  );

  useEffect(() => {
    dispatch(getNotification());
  }, [dispatch]);

  return (
    <div className="w-full  h-full">
      <h1 className="border-b border-primary px-4 py-2 text-primary font-semibold ">
        All Notifications
      </h1>
      {isLoading && (
        <div className="h-full flex items-center justify-center w-full">
          <Loader />
        </div>
      )}
      {isError && (
        <div className="h-full flex items-center justify-center w-full">
          <p className="text-red-600">Failed to load notifications.</p>
        </div>
      )}
      {!isLoading && !isError && (
        <div className="flex flex-col mt-4 gap-2">
          {data && Array.isArray(data) && data.length > 0 ? (
            data.map((notification, index) => (
              <div
                className={clsx(
                  "border hover:bg-primary/20 transition-all p-2 rounded-md"
                )}
                key={index}
              >
                <p className="sm:text-base text-xs">{notification?.data}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No notifications available.
            </p>
          )}
          {data && Array.isArray(data) && data.length > 0 && (
            <Link
              href={"/dashboard/notifications"}
              className="text-primary underline text-right sticky z-50 right-2 -bottom-2 font-medium bg-white py-1"
            >
              See All
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
