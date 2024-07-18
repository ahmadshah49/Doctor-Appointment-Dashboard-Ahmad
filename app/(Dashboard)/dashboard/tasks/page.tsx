import DashboardLayout from "../DashboardLayout";

import Task from "../../components/task/Task";
import AddTodoModal from "../../components/modals/addTodoModal/AddTodoModal";

const Tasks = () => {
  return (
    <DashboardLayout>
      <div className="p-4 h-screen">
        <Task />
        
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
