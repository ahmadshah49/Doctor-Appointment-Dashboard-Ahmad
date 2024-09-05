"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import clsx from "clsx";
import { BiSpreadsheet } from "react-icons/bi";
import { FaDisease, FaRegUser } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import { useCalender } from "./useCalender";

const Calender = () => {
  const { events, formatTime } = useCalender();

  return (
    <div className="rounded-md bg-white p-4 overflow-x-auto overflow-y-auto">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        dayMaxEventRows={1}
        moreLinkClick="popover"
        events={events?.map((item) => ({
          title: item?.name,
          start: item?.start,
          end: item?.end,
          extendedProps: {
            name: item?.name,
            appointmentType: item?.appointmentType,
            purpose: item?.purpose,
            status: item?.status,
          },
        }))}
        eventContent={(eventInfo) => {
          let bgColor = "";
          let textColor = "";
          let statusBgColor = "";

          switch (eventInfo?.event?.extendedProps?.status) {
            case "ONGOING":
              bgColor = "bg-yellow-200";
              textColor = "text-yellow-600";
              statusBgColor = "bg-yellow-300";
              break;
            case "RECOVERED":
              bgColor = "bg-green-200";
              textColor = "text-green-600";
              statusBgColor = "bg-green-300";
              break;
            case "WAITING":
              bgColor = "bg-red-200";
              textColor = "text-red-600";
              statusBgColor = "bg-red-300";
              break;
            default:
              bgColor = "bg-gray-200";
              textColor = "text-black";
          }

          return (
            <div
              className={clsx(
                `overflow-x-auto  w-full h-full ${bgColor} ${textColor}`
              )}
            >
              <div
                className={clsx(
                  `${statusBgColor} rounded-md px-2 py-1 font-semibold`
                )}
              >
                <span className="h-full w-1 bg-black"></span>
                <p>{eventInfo?.event?.extendedProps?.status}</p>
              </div>
              <div className="p-2">
                <div className="flex items-center gap-2">
                  <FaRegUser />
                  <p>{eventInfo?.event?.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <BiSpreadsheet />
                  <i>{eventInfo?.event?.extendedProps?.appointmentType}</i>
                </div>
                <div className="flex items-center gap-2">
                  <FaDisease />
                  <span>{eventInfo?.event?.extendedProps?.purpose}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdAccessTimeFilled />
                  <span>
                    {formatTime(eventInfo?.event?.start)} -{" "}
                    {formatTime(eventInfo?.event?.end)}
                  </span>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Calender;
