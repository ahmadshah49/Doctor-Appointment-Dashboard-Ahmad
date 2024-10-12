"use client";
import { FiEdit } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import {
  MdDeleteOutline,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import Loader from "../loader/Loader";
import { useUpComingSchedule } from "./useUpComingSchedule";
import ToogleAppointmentButton from "../modals/toogleAppointmentButton/ToogleAppointmentButton";

const UpComingSchedule = () => {
  const {
    events,
    formatTime,
    getStatusColor,
    handleDelete,
    isError,
    isLoading,
    isOpen,
    newTime,
    toogleOpen,
  } = useUpComingSchedule();

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
                onClick={() => toogleOpen(index)}
                className="flex relative justify-between max-h-[25px] p-2 ml-2 bg-white rounded-lg border border-gray-200 w-full items-center"
              >
                <div className="flex  gap-2 items-center">
                  <span
                    title={event?.status}
                    className={`h-2 w-2 inline-block rounded-full ${getStatusColor(
                      event?.status as string
                    )}`}
                  />
                  <span className="md:text-[11px] font-bold">
                    {" "}
                    {formatTime(event?.start)}{" "}
                  </span>
                  <h3 className="md:text-[11px] ml-4 text-sm inline-block font-medium">
                    {event?.name}
                  </h3>
                  <span className=" sm:absolute  sm:block hidden right-10 text-[10px] text-[#828282]">
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
                  <div className="p-2  sm:px-4 px-2">
                    <div className="flex mb-2 items-center sm:gap-8 ">
                      <span className="sm:w-24 xl:w-[42px] lg:w-16 w-16  text-[11px] font-bold">
                        Patient
                      </span>
                      <span className=" text-[11px]">{event?.name}</span>
                    </div>
                    <div className="flex mb-2 items-center sm:gap-8">
                      <span className="sm:w-24 xl:w-10 lg:w-16 w-16  text-[11px] font-bold">
                        Time
                      </span>
                      <span className=" text-[11px]">
                        {formatTime(event?.start)} - {formatTime(event?.end)}
                      </span>
                    </div>
                    <div className="flex mb-2 items-center sm:gap-8">
                      <span className="sm:w-24 xl:w-10 lg:w-16 w-16 text-[11px] font-bold">
                        Purpose
                      </span>
                      <span className=" text-[11px]">{event?.purpose}</span>
                    </div>
                  </div>
                  <div className="border-gray-200 flex items-center justify-between py-2 sm:px-2 border-t">
                    <div className="p-2 flex items-center gap-2">
                      <div
                        onClick={() => handleDelete(event?.id || "")}
                        className="text-xs border w-[17px] h-[17px] cursor-pointer flex items-center justify-center  rounded-md border-gray-300"
                      >
                        <MdDeleteOutline
                          size={14}
                          className="text-red-600 duration-300 font-bold"
                        />
                      </div>
                      <ToogleAppointmentButton
                        isUpdate
                        data={event}
                        key={event?.id}
                        className="text-xs border flex items-center justify-center cursor-pointer w-[17px] h-[17px]  rounded-md border-gray-300"
                      >
                        <FiEdit
                          size={12}
                          className="text-blue-600 duration-300 font-bold"
                        />
                      </ToogleAppointmentButton>
                      <div className="text-xs border  flex items-center justify-center cursor-not-allowed w-[17px] h-[17px]   rounded-md border-gray-300">
                        <LuUser2
                          size={12}
                          className="text-blue-600 duration-300 font-bold"
                        />
                      </div>
                    </div>
                    <button className="bg-primary md:block hidden cursor-not-allowed md:py-2 py-1 px-2 md:text-[10px] text-xs md:px-4 rounded-md text-white">
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
