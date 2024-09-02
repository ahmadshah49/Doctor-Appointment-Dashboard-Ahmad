"use client";

import { useAllNotifications } from "./UseAllNotifications";

const AllNotifications = () => {
  const { data } = useAllNotifications();
  return (
    <div>
      <div className="flex flex-col gap-4">
        {data.map((notification, index) => (
          <div
            key={index}
            className={`border border-slate-400 hover:bg-slate-200 transition-all duration-300 p-2 rounded-md`}
          >
            <div>
              <h1 className="text-2xl font-semibold">{notification.data}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNotifications;
