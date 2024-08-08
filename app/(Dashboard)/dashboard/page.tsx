import { Metadata } from "next";
import AnalyticCards from "../components/analyticCards/AnalyticCards";
import DashboardSchedule from "../components/dashboardSchedule/DashboardSchedule";
import Task from "../components/task/Task";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Medicare Doctor Appointment Dashboard ",
};

const Dashboard = () => {
  return (
    <div className="p-4 min-h-screen">
      <div className="">
        <h1 className="text-gray-950 font-normal">Dashboard</h1>
      </div>

      <AnalyticCards />
      <div className="flex xl:flex-row flex-col w-full gap-4 my-4">
        <div className="xl:w-[60%] w-full">
          <Task isShow seeAll />
        </div>
        <div className="xl:w-[40%] w-full">
          <DashboardSchedule />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
