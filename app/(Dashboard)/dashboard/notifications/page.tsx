import { Metadata } from "next";
import AllNotifications from "../../components/allNotifications/AllNotifications";
export const metadata: Metadata = {
  title: "All Notifications",
  description: "Medicare Doctor Appointment Dashboard ",
};
const NotificationsPage = () => {
  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-gray-950 font-normal">Notifications</h1>
      <div className="my-8">
        <AllNotifications />
      </div>
    </div>
  );
};

export default NotificationsPage;
