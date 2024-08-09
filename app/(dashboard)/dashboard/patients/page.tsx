import { Metadata } from "next";
import Menu from "../../components/menu/Menu";
import PatientTable from "../../components/patientTable/PatientTable";
export const metadata: Metadata = {
  title: "Patients",
  description: "Medicare Doctor Appointment Dashboard ",
};
const Patients = () => {
  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-gray-950 font-normal">Patient Register</h1>
      <Menu title="Patients" />

      <PatientTable />
    </div>
  );
};

export default Patients;
