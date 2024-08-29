import Tasks from "@/app/components/task/Task";
import { Metadata } from "next";

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
