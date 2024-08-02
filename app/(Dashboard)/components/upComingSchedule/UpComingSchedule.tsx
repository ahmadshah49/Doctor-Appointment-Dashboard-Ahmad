"use client";
import React, { useState } from "react";
import { useCalender } from "../calender/useCalender";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";

const UpComingSchedule = () => {
  const { events } = useCalender();
  const [isOpen, setOpen] = useState<boolean[]>(
    Array(events?.length).fill(false)
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
    });
  };
  const selectedEvents = events?.slice(0, 8);
  return (
    <div className="flex flex-col items-start w-full my-4">
      {selectedEvents?.map((event, index) => (
        <div key={index} className="flex w-full items-start  relative">
          <div className="rounded-full h-4 w-4 bg-black mt-2.5 flex-shrink-0 relative z-10" />
          {index !== events?.length - 1 && (
            <div className="absolute left-2 top-8 h-full w-px bg-gray-300" />
          )}

          <div className="ml-2 p-4 flex flex-col gap-4 w-full">
            <button
              onClick={() => toggleOpen(index)}
              className="flex justify-between p-2 bg-white rounded-lg border border-gray-200 w-full items-center"
            >
              <h3 className="text-xl font-semibold">{event?.name}</h3>

              <div className="text-xs border p-1 rounded-md border-gray-300">
                {isOpen[index] ? (
                  <MdKeyboardArrowUp
                    size={20}
                    className="text-primary duration-300 font-bold"
                  />
                ) : (
                  <MdKeyboardArrowDown
                    size={20}
                    className="text-primary font-bold "
                  />
                )}
              </div>
            </button>
            <div
              className={`transition-all duration-300 ease-linear overflow-hidden ${
                isOpen[index] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex flex-col  bg-white rounded-lg border border-gray-200 w-full">
                <div className="p-2 px-4">
                  <div className="flex gap-8">
                    <span className="w-24 font-bold">Patient</span>
                    <span>{event?.name}</span>
                  </div>
                  <div className="flex gap-8">
                    <span className="w-24 font-bold">Time</span>
                    <span>
                      {formatTime(event?.start)} - {formatTime(event?.end)}
                    </span>
                  </div>
                  <div className="flex gap-8">
                    <span className="w-24 font-bold">Purpose</span>
                    <span>{event?.purpose}</span>
                  </div>
                </div>
                <div className=" border-gray-200 flex items-center justify-between py-4 px-2 border-t">
                  <div className="p-2 flex items-center gap-2">
                    <div className="text-xs border p-1 cursor-not-allowed w-fit rounded-md border-gray-300">
                      <MdDeleteOutline
                        size={20}
                        className="text-red-600 duration-300 font-bold"
                      />
                    </div>
                    <div className="text-xs border p-1 cursor-not-allowed  w-fit rounded-md border-gray-300">
                      <FiEdit
                        size={20}
                        className="text-blue-600 duration-300 font-bold"
                      />
                    </div>
                    <div className="text-xs border p-1 cursor-not-allowed  w-fit rounded-md border-gray-300">
                      <LuUser2
                        size={20}
                        className="text-blue-600 duration-300 font-bold"
                      />
                    </div>
                  </div>
                  <button className="bg-primary cursor-not-allowed py-2 px-4 rounded-md text-white">
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
