"use client";
import person from "@/public/images/person.png";
import Image from "next/image";
import { HiDotsHorizontal } from "react-icons/hi";
import Loader from "../loader/Loader";
import ToogleButton from "../modals/toogleButton/ToogleButton";
import { usePatientTable } from "./usePatientTable";
import Menu from "../menu/Menu";

const PatientTable: React.FC = () => {
  const {
    handleDelete,
    isError,
    isLoading,
    sortedPatients,
    patientList,
    getStatusColor,
  } = usePatientTable();

  return (
    <>
      <Menu title="Total Patients" totalPatients={sortedPatients?.length} />
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
                <th className="w-20  font-normal text-left text-lg text-gray-400">
                  Name
                </th>
                <th className="w-24 font-normal  text-lg   text-gray-400">
                  Diagnosis
                </th>
                <th className="w-24 font-normal text-lg  text-gray-400">
                  Picture
                </th>
                <th className="w-24 font-normal text-lg  text-gray-400">
                  Status
                </th>
                <th className="w-24 font-normal text-lg  text-gray-400">
                  Appointment Date
                </th>
                <th className="w-24 left-0 font-normal text-lg  text-gray-400">
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
              {sortedPatients?.length > 0 &&
                sortedPatients.map((item) => (
                  <tr className="h-[72px]" key={item.id}>
                    <td className="text-lg text-left font-normal">
                      {item.name}
                    </td>
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
                      <div className="flex items-center justify-center ">
                        <ToogleButton isUpdate id={item?.id} patient={item}>
                          <HiDotsHorizontal size={25} color="gray" />
                        </ToogleButton>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default PatientTable;
