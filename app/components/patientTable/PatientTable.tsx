"use client";
import person from "@/public/images/person.png";
import Image from "next/image";
import Loader from "../loader/Loader";
import ToogleButton from "../modals/toogleButton/ToogleButton";
import { usePatientTable } from "./usePatientTable";

const PatientTable = () => {
  const {
    handleDelete,
    isError,
    isLoading,
    sortedPatients,
    patientList,
    getStatusColor,
  } = usePatientTable();

  return (
    <div className="p-4 px-6 rounded-md overflow-x-auto bg-white shadow-md h-full">
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      )}
      {!isLoading && (
        <table className="w-full  min-w-[1000px]">
          <thead className=" h-16 border-b">
            <tr>
              <th className="w-20  font-normal text-left text-base text-gray-400">
                Name
              </th>
              <th className="w-24 font-normal  text-base   text-gray-400">
                Diagnosis
              </th>
              <th className="w-24 font-normal text-base  text-gray-400">
                Picture
              </th>
              <th className="w-24 font-normal text-base  text-gray-400">
                Status
              </th>
              <th className="w-24 font-normal text-base  text-gray-400">
                Appointment Date
              </th>
              <th className="w-24 left-0 font-normal text-base  text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {isError && (
              <tr>
                <td colSpan={6}>
                  <p className="text-center">Error Loading Patients</p>
                </td>
              </tr>
            )}
            {!isError && sortedPatients?.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <p className="text-center">No Patient Found!</p>
                </td>
              </tr>
            )}
            {sortedPatients.length > 0 &&
              sortedPatients.map((item) => (
                <tr className="h-[72px]" key={item.id}>
                  <td className="text-lg text-left font-normal">{item.name}</td>
                  <td className="text-lg font-normal">{item.diagnosis}</td>
                  <td className="text-lg font-normal">
                    <Image
                      src={item?.profileImage || person}
                      alt="patient image"
                      width={500}
                      height={500}
                      className="w-8 h-8 mx-auto rounded-full object-center object-cover"
                    />
                  </td>
                  <td className="  md:text-base   font-normal">
                    <div
                      className={`min-w-[140px] flex items-center justify-center text-[13px] max-w-[140px] max-h-[21px] mx-auto rounded-2xl ${getStatusColor(
                        item?.status as string
                      )}`}
                    >
                      {item?.status}
                    </div>
                  </td>
                  <td className="text-lg font-normal">
                    {item?.appointmentDate}
                  </td>
                  <td>
                    <div className="flex items-center justify-evenly">
                      <ToogleButton
                        patient={item}
                        id={item.id}
                        isUpdate
                        className="rounded-md hover:bg-blue-800 bg-blue-600 transition-colors ease-linear text-white font-semibold px-3 py-1"
                      >
                        Update
                      </ToogleButton>
                      <button
                        onClick={() => handleDelete(item?.id)}
                        className="rounded-md hover:bg-red-700 bg-red-600 transition-colors ease-linear text-white font-semibold px-3 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientTable;
