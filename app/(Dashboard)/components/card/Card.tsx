import { GraphProps } from "@/app/types/Type";
import OnlinePatientsChart from "../charts/onlinePatientsChart/OnlinePatientsChart";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import OfflinePatientsChart from "../charts/offlinePaitentsChart/OfflinePatientsChart";
import TotalPatientsChart from "../charts/totalPatients/TotalPatientsChart";

const Card: React.FC<GraphProps> = ({
  title,
  number,
  dcrement,
  value,
  offLinePatients,
  onLinePatients,
  totalPatients,
}) => {
  return (
    <div className="shadow-md bg-white rounded-md p-4 xl:max-w-[358px] w-full min-h-[192px]">
      <div className="flex   justify-between">
        <h1 className="text-[22px] font-medium">{title}</h1>
        <span className="text-xl font-medium">...</span>
      </div>
      <div className=" flex lg:flex-row flex-col h-[80%]  justify-between items-center">
        <div className="lg:flex flex-col h-full py-4 justify-between">
          <p className="text-[38px] font-bold">{number}</p>
          {value && (
            <div className="flex gap-4 justify-center items-center">
              <div
                className={`w-5 h-5 rounded-full ${
                  dcrement ? "bg-red-600" : "bg-green-600"
                } flex items-center justify-center`}
              >
                <p className="font-extrabold text-white text-sm">
                  {dcrement ? <FaArrowDown /> : <FaArrowUp />}
                </p>
              </div>
              <p
                className={`text-xs font-bold ${
                  dcrement ? "text-red-600" : "text-green-600"
                }`}
              >
                {value}
              </p>
            </div>
          )}
        </div>
        <div className="xl:max-w-[220px]  lg:w-[80%] w-full">
          {onLinePatients && <OnlinePatientsChart />}
          {offLinePatients && <OfflinePatientsChart />}
          {totalPatients && <TotalPatientsChart />}
        </div>
      </div>
    </div>
  );
};

export default Card;
