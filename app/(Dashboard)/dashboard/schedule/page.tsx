import React from "react";
import DashboardLayout from "../DashboardLayout";
import Calender from "../../components/calender/Calender";
import ScheduleMenu from "../../components/scheduleMenu/ScheduleMenu";

const Schedule = () => {
  return (
    <DashboardLayout>
      <div className="p-4">
        <h1>Schedules</h1>
        <ScheduleMenu title="Weekly Schedule" />

        <Calender />
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
