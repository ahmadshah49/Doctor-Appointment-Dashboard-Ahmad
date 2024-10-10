"use client";

import { FiDelete } from "react-icons/fi";
import Button from "../button/Button";
import { useAllNotifications } from "./UseAllNotifications";

const AllNotifications = () => {
  const { data, deleteNotification, deleteAllNotification } =
    useAllNotifications();

  return (
    <div>
      <div className="flex flex-col gap-4">
        <span className="w-24">
          <Button
            onClick={deleteAllNotification}
            text="Delete All"
            widthFull
            transparent
          />
        </span>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((notification, index) => (
            <div
              key={index}
              className={`border border-slate-400 hover:bg-slate-200 transition-all duration-300 p-2 rounded-md`}
            >
              <div className="flex justify-between items-baseline">
                <h1 className="text-2xl font-semibold">{notification?.data}</h1>
                <button onClick={() => deleteNotification(notification?.id)}>
                  <FiDelete color="red" size={30} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default AllNotifications;
