"use client";
import Input from "@/app/components/Input";
import { storage } from "@/app/lib/firebase";
import { AddPatientTypes, PatientStatus } from "@/app/types/Type";
import placeholder from "@/public/images/placeholder.png";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const AddPatient: React.FC<AddPatientTypes> = ({ isUpdate, onClose }) => {
  const [name, setName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [status, setStatus] = useState(PatientStatus.ONGOING);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      const storageRef = ref(storage, `patients/${file.name}`);
      const uploadTask = uploadBytes(storageRef, file);

      uploadTask
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadUrl) => {
          setProfileImage(downloadUrl);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Upload Failed");
          setLoading(false);
        });
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("");
  };

  const handleAddPatient = async () => {
    await axios.post("http://localhost:3000/api/patient", {
      name,
      diagnosis,
      profileImage,
      status,
      appointmentDate,
    });
    toast.success("Patient added");
    onClose();
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUpdate) {
      handleAddPatient();
    } else {
      console.log("data from update", {
        name,
        diagnosis,
        profileImage,
        status,
        appointmentDate,
      });
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="bg-black/60 backdrop-blur-sm z-50 w-full h-full fixed inset-0">
      <div
        onClick={handleOverlayClick}
        className="flex items-center justify-center h-full"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-[20px] transition-all ease-in-out w-[50%] py-10"
        >
          <h1 className="text-center text-4xl font-bold text-primary my-6">
            {isUpdate ? "Update Patient" : "Add Patient"}
          </h1>

          <form onSubmit={submitHandler} className="px-10 text-left">
            <Input
              name="name"
              id="name"
              label="Patient Name"
              placeHolder="Enter Patient Name"
              value={name}
              type="text"
              required
              onChange={(e) => setName(e)}
              sup
            />
            <Input
              name="diagnosis"
              id="diagnosis"
              label="Diagnosis"
              placeHolder="Enter diagnosis"
              value={diagnosis}
              type="text"
              required
              onChange={(e) => setDiagnosis(e)}
              sup
            />
            <Input
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
            <div className="w-full my-6">
              <label className="text-sm text-left" htmlFor={status}>
                Status <sup className="text-red-600 text-base">*</sup>
              </label>
              <div>
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  id="status"
                  name="status"
                  required
                  className="
                    border-b 
                    border-gray-400
                    outline-none
                    focus:border-black
                    pt-2
                    primary:text-[22px]
                    md:text-[18px]
                    font-medium
                    w-full
                    disabled:cursor-not-allowed
                  "
                >
                  {Object.values(PatientStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

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

            <div className="flex items-center justify-center gap-[30px] mb-6 mt-16">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-600 px-8 py-3 w-[150px] rounded-md font-semibold text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary px-8 py-3 rounded-md font-semibold text-white w-[150px]"
              >
                {isUpdate ? "Save" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
