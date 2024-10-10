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
  const dayCellClassNames = () => {
    return ["fc-daygrid-day,fc-daygrid-body,calendar-container,fc-toolbar"];
  };

  return (
    <div className="rounded-md bg-white p-4 overflow-x-auto h-screen overflow-y-auto">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        dayMaxEventRows={1}
        height="1000px"
        allDaySlot={false}
        moreLinkClick="popover"
        headerToolbar={{
          left: "prev,next today",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
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
        dayCellClassNames={dayCellClassNames}
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
                  `${statusBgColor} min-w-full rounded-md px-2 py-1 font-semibold`
                )}
              >
                <p className="w-full">
                  {eventInfo?.event?.extendedProps?.status}
                </p>
              </div>
              <div className="p-2">
                <div className="flex items-center gap-2">
                  <FaRegUser className="w-4 h-4 flex-shrink-0" />
                  <p>{eventInfo?.event?.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <BiSpreadsheet className="w-4 h-4 flex-shrink-0" />
                  <i>{eventInfo?.event?.extendedProps?.appointmentType}</i>
                </div>
                <div className="flex items-center gap-2">
                  <FaDisease className="w-4 h-4 flex-shrink-0" />
                  <span>{eventInfo?.event?.extendedProps?.purpose}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdAccessTimeFilled className="w-4 h-4 flex-shrink-0" />
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
