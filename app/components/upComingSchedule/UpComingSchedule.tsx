"use client";
import { deleteAppointment } from "@/app/redux/slices/deleteAppointmentSlice";
import { fetchAppointment } from "@/app/redux/slices/getAppointmentSlice";
import { AppDispatch } from "@/app/redux/store";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import {
  MdDeleteOutline,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { useCalender } from "../calender/useCalender";
import Loader from "../loader/Loader";

const UpComingSchedule = () => {
  const { events, isError, isLoading } = useCalender();
  const disPatch: AppDispatch = useDispatch();
  const [isOpen, setOpen] = useState<boolean[]>(
    Array(events?.length || 0).fill(false)
  );

  const toggleOpen = (index: number) => {
    setOpen((prevOpen) => {
      const newOpen = [...prevOpen];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };

  const formatTime = (date: any) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Karachi",
    });
  };
  const handleDelete = (id: string) => {
    disPatch(deleteAppointment(id)).unwrap();
    disPatch(fetchAppointment()).unwrap();
    toast.success("Appointment Deleted!");
  };

  return (
    <div className="flex flex-col max-h-screen overflow-y-auto items-start w-full my-4">
      {isLoading && (
        <div className="flex justify-center w-full">
          <Loader />
        </div>
      )}

      {isError && (
        <div className="text-red-500 text-center w-full my-2">
          Error loading events. Please try again later.
        </div>
      )}

      {!isLoading && !isError && events?.length === 0 && (
        <div className="text-gray-500 text-center w-full my-2">
          No upcoming schedules available.
        </div>
      )}

      {!isLoading &&
        !isError &&
        events?.map((event, index) => (
          <div key={index} className="flex w-full  items-start relative">
            <div className="rounded-full h-4 w-4 bg-black mt-2.5 flex-shrink-0 relative z-10" />
            {index !== events?.length - 1 && (
              <div className="absolute left-[7.5px] top-[28px] h-full w-px bg-gray-300" />
            )}

            <div className="sm:ml-2 p-1 sm:p-4 flex flex-col sm:gap-4 gap-2 w-full">
              <button
                onClick={() => toggleOpen(index)}
                className="flex justify-between p-2 bg-white rounded-lg border border-gray-200 w-full items-center"
              >
                <h3 className="md:text-xl text-sm font-semibold">
                  {event?.name}
                </h3>

                <div className="text-xs border p-1 rounded-md border-gray-300">
                  {isOpen[index] ? (
                    <MdKeyboardArrowUp
                      size={20}
                      className="text-primary duration-300 font-bold"
                    />
                  ) : (
                    <MdKeyboardArrowDown
                      size={20}
                      className="text-primary font-bold"
                    />
                  )}
                </div>
              </button>
              <div
                className={`transition-all duration-300 ease-linear overflow-hidden ${
                  isOpen[index] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col bg-white rounded-lg border border-gray-200 w-full">
                  <div className="p-2 sm:px-4 px-2">
                    <div className="flex items-center sm:gap-8">
                      <span className="sm:w-24 w-16 md:text-base text-sm font-bold">
                        Patient
                      </span>
                      <span className="sm:text-base text-[10px]">
                        {event?.name}
                      </span>
                    </div>
                    <div className="flex items-center sm:gap-8">
                      <span className="sm:w-24 w-16 md:text-base text-sm font-bold">
                        Time
                      </span>
                      <span className="sm:text-base text-[10px]">
                        {formatTime(event?.start)} - {formatTime(event?.end)}
                      </span>
                    </div>
                    <div className="flex items-center sm:gap-8">
                      <span className="sm:w-24 w-16 md:text-base text-sm font-bold">
                        Purpose
                      </span>
                      <span className="sm:text-base text-[10px]">
                        {event?.purpose}
                      </span>
                    </div>
                  </div>
                  <div className="border-gray-200 flex items-center justify-between py-4 sm:px-2 border-t">
                    <div className="p-2 flex items-center gap-2">
                      <div
                        onClick={() => handleDelete(event?.id || "")}
                        className="text-xs border p-1 cursor-pointer w-fit rounded-md border-gray-300"
                      >
                        <MdDeleteOutline
                          size={20}
                          className="text-red-600 duration-300 font-bold"
                        />
                      </div>
                      <button className="text-xs border cursor-not-allowed p-1  w-fit rounded-md border-gray-300">
                        <FiEdit
                          size={20}
                          className="text-blue-600 duration-300 font-bold"
                        />
                      </button>
                      <div className="text-xs border p-1 cursor-not-allowed  w-fit rounded-md border-gray-300">
                        <LuUser2
                          size={20}
                          className="text-blue-600 duration-300 font-bold"
                        />
                      </div>
                    </div>
                    <button className="bg-primary md:block hidden cursor-not-allowed md:py-2 py-1 px-2 md:text-base text-xs md:px-4 rounded-md text-white">
                      Begin Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UpComingSchedule;
