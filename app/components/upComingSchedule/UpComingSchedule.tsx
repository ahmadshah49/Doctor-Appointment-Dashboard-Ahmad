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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "RECOVERED":
        return "bg-green-600 text-green-800";
      case "ONGOING":
        return "bg-yellow-500 text-yellow-800";
      case "WAITING":
        return "bg-red-600 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
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

  const newTime = (date: any) => {
    return new Date(date).toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
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
          <div
            key={index}
            className="flex w-full h-full relative  items-start "
          >
            <span className="text-xs lg:w-10 max-w-[36px] md:mr-[40px] mr-[15px] ">
              {newTime(event?.start)}
            </span>

            <div className="h-full absolute md:ml-[86px] ml-[40px] mr-4">
              <div className="rounded-full h-[10px] w-[10px] bg-black mt-2.5 flex-shrink-0 relative z-10" />
              {index !== events?.length - 1 && (
                <div className="absolute left-[3.7px] top-[18px] h-full w-px bg-gray-300" />
              )}
            </div>

            <div className="sm:ml-2  p-1 sm:p-4 flex flex-col sm:gap-4 gap-2 w-full">
              <button
                onClick={() => toggleOpen(index)}
                className="flex relative justify-between p-2 ml-2 bg-white rounded-lg border border-gray-200 w-full items-center"
              >
                <div className="flex  gap-4 items-center">
                  <span
                    title={event?.status}
                    className={`h-2 w-2 inline-block rounded-full ${getStatusColor(
                      event?.status as string
                    )}`}
                  />
                  <span className="md:text-[14px] font-bold">
                    {" "}
                    {newTime(event?.start)}{" "}
                  </span>
                  <h3 className="md:text-[14px] ml-4 text-sm inline-block font-medium">
                    {event?.name}
                  </h3>
                  <span className=" sm:absolute  sm:block hidden right-12 text-[10px] text-[#828282]">
                    {event?.status}
                  </span>
                </div>

                <div className="text-xs border w-[17px] h-[17px] flex items-center justify-center rounded-md border-gray-300">
                  {isOpen[index] ? (
                    <MdKeyboardArrowUp className="text-primary duration-300 w-[10px] h-10px flex-shrink-0  font-bold" />
                  ) : (
                    <MdKeyboardArrowDown className="text-primary duration-300 w-[10px] h-10px flex-shrink-0  font-bold" />
                  )}
                </div>
              </button>
              <div
                className={`transition-all duration-300 ease-linear ml-2 overflow-hidden ${
                  isOpen[index] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col bg-white rounded-lg border border-gray-200 w-full">
                  <div className="p-2 sm:px-4 px-2">
                    <div className="flex items-center sm:gap-8 ">
                      <span className="sm:w-24 xl:w-[42px] lg:w-16 w-16  text-sm font-bold">
                        Patient
                      </span>
                      <span className="text-sm text-[10px]">{event?.name}</span>
                    </div>
                    <div className="flex items-center sm:gap-8">
                      <span className="sm:w-24 xl:w-10 lg:w-16 w-16  text-sm font-bold">
                        Time
                      </span>
                      <span className="text-sm text-[10px]">
                        {formatTime(event?.start)} - {formatTime(event?.end)}
                      </span>
                    </div>
                    <div className="flex items-center sm:gap-8">
                      <span className="sm:w-24 xl:w-10 lg:w-16 w-16 text-sm font-bold">
                        Purpose
                      </span>
                      <span className="text-sm text-[10px]">
                        {event?.purpose}
                      </span>
                    </div>
                  </div>
                  <div className="border-gray-200 flex items-center justify-between py-2 sm:px-2 border-t">
                    <div className="p-2 flex items-center gap-2">
                      <div
                        onClick={() => handleDelete(event?.id || "")}
                        className="text-xs border p-1 cursor-pointer w-fit rounded-md border-gray-300"
                      >
                        <MdDeleteOutline
                          size={15}
                          className="text-red-600 duration-300 font-bold"
                        />
                      </div>
                      <button className="text-xs border cursor-not-allowed p-1  w-fit rounded-md border-gray-300">
                        <FiEdit
                          size={15}
                          className="text-blue-600 duration-300 font-bold"
                        />
                      </button>
                      <div className="text-xs border p-1 cursor-not-allowed  w-fit rounded-md border-gray-300">
                        <LuUser2
                          size={15}
                          className="text-blue-600 duration-300 font-bold"
                        />
                      </div>
                    </div>
                    <button className="bg-primary md:block hidden cursor-not-allowed md:py-2 py-1 px-2 md:text-sm text-xs md:px-4 rounded-md text-white">
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
