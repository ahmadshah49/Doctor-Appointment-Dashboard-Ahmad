import React from "react";
import DashboardLayout from "../DashboardLayout";
import PatientMenu from "../../components/patientMenu/PatientMenu";
import PatientTable from "../../components/patientTable/PatientTable";

const Patients = () => {
  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-gray-950 font-normal">Patient Register</h1>
        <PatientMenu />
        <PatientTable/>
      </div>
    </DashboardLayout>
  );
};

export default Patients;
