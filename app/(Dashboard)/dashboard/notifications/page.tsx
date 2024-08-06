import AllNotifications from "../../components/allNotifications/AllNotifications";

const NotificationsPage = () => {
  return (
    <div className="p-4 h-screen">
      <h1 className="text-gray-950 font-normal">Notifications</h1>
      <div className="my-8">
        <AllNotifications />
      </div>
    </div>
  );
};

export default NotificationsPage;
