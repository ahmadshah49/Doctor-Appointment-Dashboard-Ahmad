import React from "react";
import DashboardLayout from "../DashboardLayout";
import Calender from "../../components/calender/Calender";
import Menu from "../../components/menu/Menu";

const Schedule = () => {
  return (
    <DashboardLayout>
      <div className="p-4">
        <h1>Schedules</h1>

        <Menu title="Weekly Schedule" />
        <Calender />
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
