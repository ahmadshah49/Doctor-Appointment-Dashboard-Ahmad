import { Metadata } from "next";
import Tasks from "@/app/components/task/Task";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Medicare Doctor Appointment Dashboard ",
};
const Task = () => {
  return (
    <div className="p-4 h-screen">
      <Tasks />
    </div>
  );
};

export default Task;
