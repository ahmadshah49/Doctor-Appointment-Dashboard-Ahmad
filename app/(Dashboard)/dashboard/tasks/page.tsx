"use client";
import DashboardLayout from "../DashboardLayout";
import DashboardTask from "../../components/DashboardTask/DashboardTask";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "@/app/redux/slices/taskTodoSlice";

const Tasks = () => {
  // const disPatch: AppDispatch = useDispatch();
  // const tasks = useSelector((state: RootState) => state.tasks.tasks);

  // console.log("Tasks", tasks);
  // useEffect(() => {
  //   disPatch(fetchTasks());
  // }, [disPatch]);
  const tasks = [
    {
      id: "fajkpgf",
      title: " string",
      description: "string;",
      date: new Date("2023-07-13T00:00:00Z"),
      completed: false,
      userId: "6464464646",
    },
    {
      id: "fajkpgf",
      title: " string",
      description: "string;",
      date: new Date("2023-07-13T00:00:00Z"),
      completed: false,
      userId: "6464464646",
    },
    {
      id: "fajkpgf",
      title: " string",
      description: "string;",
      date: new Date("2023-07-13T00:00:00Z"),
      completed: false,
      userId: "6464464646",
    },
    {
      id: "fajkpgf",
      title: " string",
      description: "string;",
      date: new Date("2023-07-13T00:00:00Z"),
      completed: false,
      userId: "6464464646",
    },
  ];
  return (
    <DashboardLayout>
      <div className="p-4 h-screen">
        <DashboardTask todoData={tasks} />
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
