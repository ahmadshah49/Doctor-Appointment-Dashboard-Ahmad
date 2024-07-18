import Task from "../(Dashboard)/components/task/Task";

export type MenuProps = { title: string };
export type TodoTypes = {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
  userId: string | null;
};
export type taskState = {
  tasks: TodoTypes[];
  isLoading: boolean;
  isError: string | null;
};
export type AddPatientTypes = {
  onClose: () => void;
  isUpdate?: boolean;
};
export type AddTodoTypes = {
  onClose: () => void;
  isUpdate?: boolean;
};
export const PatientStatus = {
  ONGOING: "ONGOING",
  ON_TREATMENT: "ON_TREATMENT",
  WAITING: "WAITING",
};
export const TodoStatus = {
  NOT_COMPLETED: "NOT_COMPLETED",
  COMPLETED: "COMPLETED",
};
export type Task = {
  title: string;
  description: string;
  completed: string;
  date?: Date;
  id?: string;
};
export type initalStateTypes = {
  task: Task[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
};
