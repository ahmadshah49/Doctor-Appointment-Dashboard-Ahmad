import { IoHelpCircleOutline } from "react-icons/io5";
import Profile from "../../components/profile/Profile";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Settings",
  description: "Medicare Doctor Appointment Dashboard ",
};
const SettingsPage = () => {
  return (
    <div className="p-4 h-screen">
      <h1 className="text-gray-950 font-normal">Settings</h1>
      <div className="flex items-center justify-between max-h-[72px] md:px-[25px]">
        <h1 className="text-[22px] font-medium my-8">Edit Profile</h1>
        <div>
          <div className="text-xs border p-1 rounded-md border-gray-300">
            <IoHelpCircleOutline size={35} />
          </div>
        </div>
      </div>
      <div className="md:px-[25px] mt-10">
        <Profile />
      </div>
    </div>
  );
};

export default SettingsPage;
