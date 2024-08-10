import { Metadata } from "next";
import Task from "../../../components/task/Task";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Medicare Doctor Appointment Dashboard ",
};
const Tasks = () => {
  return (
    <div className="p-4 h-screen">
      <Task />
    </div>
  );
};

export default Tasks;
