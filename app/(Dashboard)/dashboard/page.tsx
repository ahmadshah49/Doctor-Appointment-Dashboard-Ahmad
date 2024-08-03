import Card from "../components/card/Card";
import DashboardSchedule from "../components/dashboardSchedule/DashboardSchedule";
import Task from "../components/task/Task";

import DashboardLayout from "./DashboardLayout";
const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-4 h-screen">
        <div className="">
          <h1 className="text-gray-950 font-normal">Dashboard</h1>
        </div>

        <div className="flex mt-7 gap-4 w-full justify-between">
          <Card title="Online Patients" number={155} value={"+24.54%"} />
          <Card title="Online Patients" number={19} value={"-64.8%"} dcrement />
          <Card title="Online Patients" number={155} />
        </div>
        <div className="flex w-full gap-4 my-4">
          <div className="w-[60%]">
            <Task isShow seeAll />
          </div>
          <div className="w-[40%]">
            <DashboardSchedule />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
