"use client";
import { storage } from "@/app/lib/firebase";
import { AddPatientTypes, PatientStatus } from "@/app/types/Type";
import placeholder from "@/public/images/placeholder.png";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import CheckBox from "../../checkBox/CheckBox";
import InputTwo from "../../inputTwo/InputTwo";
import { useAddPatient } from "./useAddPatient";

const AddPatient: React.FC<AddPatientTypes> = ({
  isUpdate,
  onClose,
  id,
  patient,
}) => {
  const {
    name,
    diagnosis,
    appointmentDate,
    status,
    profileImage,
    setName,
    isLoading,
    setAppointmentDate,
    setDiagnosis,
    setProfileImage,
    setStatus,
    submitHandler,
    handleImageChange,
    handleImageClick,
    loading,
    inputRef,
    handleRemoveImage,
    handleDelete,
  } = useAddPatient({ onClose, isUpdate, id, patient });

  return (
    <div className="bg-gray-100 p-4 backdrop-blur-sm z-50 w-full h-full absolute lg:top-[92px] top-[64px] inset-0">
      <h1 className="text-gray-950 text-[18px] font-normal h-[40px]  flex items-center">
        {isUpdate ? "Update Patient" : <p>Patient Register &gt; Add Patient</p>}
      </h1>
      <form onSubmit={submitHandler}>
        <div className="md:p-4 p-2 px-6 rounded-md bg-white my-4 shadow-md flex items-center justify-between">
          <div className="font-medium sm:block hidden  text-xl">
            Add new patient <span className="text-gray-400 font-normal"></span>
          </div>
          <div className="flex items-center justify-between sm:gap-6 gap-2">
            {isUpdate && (
              <button
                className="bg-red-600 p-2 rounded-md font-semibold text-white"
                onClick={() => handleDelete(id)}
              >
                <MdDelete size={25} color="white" />
              </button>
            )}
            <button
              onClick={() => onClose()}
              className="py-2  min-w-[68px] rounded-md ring-[1px] ring-primary "
            >
              <p className="text-primary sm:block font-semibold flex items-center justify-center">
                Cancel
              </p>
            </button>
            <button
              type="submit"
              className="py-2 min-w-[68px]  rounded-md bg-primary "
            >
              <p className="text-white font-semibold flex items-center justify-center">
                Save
              </p>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-[43px]">
          <div className="bg-white rounded-[20px] xl:max-w-[783px]  xl:min-w-[783px] lg:w-[80%] md:w-[85%] w-[90%] py-10">
            <div className="sm:px-10 px-4 text-left">
              <InputTwo
                name="name"
                id="name"
                label="Patient Name"
                value={name}
                type="text"
                required
                onChange={(e) => setName(e)}
              />

              <InputTwo
                name="diagnosis"
                id="diagnosis"
                label="Diagnosis"
                value={diagnosis}
                type="text"
                required
                onChange={(e) => setDiagnosis(e)}
                sup
              />
              <InputTwo
                name="appointmentDate"
                id="appointmentDate"
                label="Appointment Date"
                placeHolder="Enter Appointment Date"
                value={appointmentDate}
                type="date"
                required
                onChange={(e) => setAppointmentDate(e)}
                sup
              />
              <CheckBox
                required
                label="Appointment Type"
                options={Object.values(PatientStatus)}
                selectedOption={status}
                setSelectedOption={setStatus}
              />

              <div className="border-2 border-dashed flex justify-between items-center border-gray-400 focus:border-black mt-14 p-4 w-full rounded-md text-center">
                <div onClick={handleImageClick} className="cursor-pointer">
                  {loading ? (
                    <div>Processing...</div>
                  ) : (
                    <Image
                      src={profileImage || placeholder}
                      alt="Upload image"
                      width={500}
                      height={500}
                      className="rounded-md object-cover w-20 h-20"
                    />
                  )}
                </div>
                <input
                  type="file"
                  ref={inputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
                {!profileImage && (
                  <p className="font-semibold">Upload Patient Image</p>
                )}
                {profileImage && !loading && (
                  <div className="">
                    <button onClick={handleRemoveImage} type="button">
                      <MdDelete size={25} color="red" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
