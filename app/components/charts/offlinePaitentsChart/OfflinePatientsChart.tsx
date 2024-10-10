"use client";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import { useOfflinePatientsChart } from "./useOfflinePatientsChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const OfflinePatientsChart: React.FC = () => {
  const { chartRef, data, options } = useOfflinePatientsChart();
  return (
    <div className="relative xl:max-h-[112px] xl:max-w-[164px] w-full h-full">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default OfflinePatientsChart;
