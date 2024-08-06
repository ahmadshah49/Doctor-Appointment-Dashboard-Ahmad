import AnalyticCards from "../components/analyticCards/AnalyticCards";
import DashboardSchedule from "../components/dashboardSchedule/DashboardSchedule";
import Task from "../components/task/Task";

const Dashboard = () => {
  return (
    <div className="p-4 h-screen">
      <div className="">
        <h1 className="text-gray-950 font-normal">Dashboard</h1>
      </div>

      <AnalyticCards />
      <div className="flex w-full gap-4 my-4">
        <div className="w-[60%]">
          <Task isShow seeAll />
        </div>
        <div className="w-[40%]">
          <DashboardSchedule />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
