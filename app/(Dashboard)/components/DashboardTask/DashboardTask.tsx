import Link from "next/link";
import Todo from "./todo/Todo";

const DashboardTask = () => {
  return (
    <div className="w-[60%] shadow-md p-4">
      <h1 className="text-gray-950 py-4 font-semibold ">Tasks</h1>
      <Todo />
      <Todo />
      <Todo />
      <Todo />

      <Link
        href={"/dashboard/tasks"}
        className="text-primary flex items-center gap-4 justify-end"
      >
        View all
        <span className="w-7 flex items-center justify-center h-7 rounded-md border border-gray-400">
          <p>⇨</p>
        </span>
      </Link>
    </div>
  );
};

export default DashboardTask;
