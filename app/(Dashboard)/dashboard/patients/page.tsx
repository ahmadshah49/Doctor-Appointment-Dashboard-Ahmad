import React from "react";
import DashboardLayout from "../DashboardLayout";
import Menu from "../../components/menu/Menu";
import PatientTable from "../../components/patientTable/PatientTable";
import AddPatient from "@/app/(Dashboard)/components/modals/addPatient/AddPatient";

const Patients = () => {
  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-gray-950 font-normal">Patient Register</h1>
        <Menu title="Patients" />

        <PatientTable />
      </div>
    </DashboardLayout>
  );
};

export default Patients;
