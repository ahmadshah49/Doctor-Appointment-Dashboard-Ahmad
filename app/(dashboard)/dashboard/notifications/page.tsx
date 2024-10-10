import { Metadata } from "next";
import AllNotifications from "@/app/components/allNotifications/AllNotifications";

export const metadata: Metadata = {
  title: "All Notifications",
  description: "Medicare Doctor Appointment Dashboard ",
};
const NotificationsPage = async () => {
  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-950 font-medium text-xl">Notifications</h1>
      </div>
      <div className="my-8">
        <AllNotifications />
      </div>
    </div>
  );
};

export default NotificationsPage;
