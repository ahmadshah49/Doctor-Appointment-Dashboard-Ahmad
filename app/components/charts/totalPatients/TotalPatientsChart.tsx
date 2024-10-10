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
          onlineConsultations?.length || 0,
          offlineConsultations?.length || 0,
        ],
        backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(192, 75, 75, 1)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(192, 75, 75, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const centerText = {
    id: "centerText",
    beforeDraw(chart: any, args: any, pluginOptions: any) {
      const {
        ctx,
        chartArea: { width, height },
      } = chart;
      ctx.save();
      const xCoor = width / 2;
      const yCoor = height / 2;
      ctx.font = "bold 20px sans-serif";
      ctx.fillStyle = "rgba(54, 162, 235, 1)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Patients", xCoor, yCoor);
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      centerText,
    },
    cutout: "80%",
  };

  return (
    <div className="relative xl:max-h-[112px] xl:max-w-[164px] w-full h-full">
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        {onlineConsultations?.length && (
          <p>
            <span>{onlineConsultations?.length} </span>
            <span className="text-[#2F80ED] ">Online</span>
          </p>
        )}
        {offlineConsultations?.length && (
          <p>
            <span>{offlineConsultations?.length} </span>
            <span className="text-[#EB5757] ">Offline</span>
          </p>
        )}
      </span>

      <Doughnut
        ref={chartRef}
        data={data}
        options={options}
        className="relative"
      />
    </div>
  );
};

export default TotalPatientsChart;
