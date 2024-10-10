"use client";
import { useRef } from "react";
import { useCalender } from "../../calender/useCalender";

export const useTotalPatientsChart = () => {
  const chartRef = useRef(null);
  const { events } = useCalender();
  const onlineConsultations = events?.filter(
    (event) => event.appointmentType === "Online_Consultation"
  );
  const offlineConsultations = events?.filter(
    (event) => event.appointmentType === "Offline_Consultation"
  );

  const data = {
    labels: ["Online Patients", "Offline Patients"],
    datasets: [
      {
        label: "My Dataset",
        data: [
          onlineConsultations?.length || 0,
          offlineConsultations?.length || 0,
        ],
        backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(192, 75, 75, 1)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(192, 75, 75, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "80%",
  };
  return { options, data, chartRef, onlineConsultations, offlineConsultations };
};
