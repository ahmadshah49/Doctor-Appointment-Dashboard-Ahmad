"use client";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { useCalender } from "../../calender/useCalender";

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalPatientsChart: React.FC = () => {
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
          `${onlineConsultations?.length}`,
          `${offlineConsultations?.length}`,
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
  };

  return (
    <div className="relative w-full h-full">
      <Doughnut ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default TotalPatientsChart;
