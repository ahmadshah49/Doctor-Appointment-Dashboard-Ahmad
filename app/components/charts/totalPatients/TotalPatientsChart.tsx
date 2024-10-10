"use client";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useTotalPatientsChart } from "./useTotalPatientsChart";

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalPatientsChart: React.FC = () => {
  const { chartRef, data, offlineConsultations, onlineConsultations, options } =
    useTotalPatientsChart();

  return (
    <div className="relative xl:max-h-[112px] xl:max-w-[164px] w-full h-full">
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <p>
          <span>{onlineConsultations?.length} </span>
          <span className="text-[#2F80ED] ">Online</span>
        </p>

        <p>
          <span>{offlineConsultations?.length} </span>
          <span className="text-[#EB5757] ">Offline</span>
        </p>
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
