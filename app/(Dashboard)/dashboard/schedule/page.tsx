import Calender from "../../components/calender/Calender";
import ScheduleMenu from "../../components/scheduleMenu/ScheduleMenu";

const Schedule = () => {
  return (
    <div className="p-4">
      <h1>Schedules</h1>
      <ScheduleMenu title="Weekly Schedule" />

      <Calender />
    </div>
  );
};

export default Schedule;
