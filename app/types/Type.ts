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
export const PatientStatus = {
  ONGOING: "ONGOING",
  ON_TREATMENT: "ON_TREATMENT",
  WAITING: "WAITING",
};
