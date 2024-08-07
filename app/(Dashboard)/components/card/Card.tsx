import { GraphProps } from "@/app/types/Type";
import OnlinePatientsChart from "../charts/onlinePatientsChart/OnlinePatientsChart";

const Card: React.FC<GraphProps> = ({
  title,
  number,
  data,
  dcrement,
  value,
}) => {
  return (
    <div className="shadow-md bg-white rounded-md p-4 w-full min-h-[192px]">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">{title}</h1>
        <span className="text-xl font-medium">...</span>
      </div>
      <div className=" flex lg:flex-row flex-col justify-between items-center">
        <div>
          <p className="text-2xl py-2 font-medium">{number}</p>
          {value && (
            <div className="flex gap-4 items-center">
              <div
                className={`w-5 h-5 rounded-full ${
                  dcrement ? "bg-red-600" : "bg-green-600"
                } flex items-center justify-center`}
              >
                <p className="font-extrabold text-white text-sm">
                  {dcrement ? "↓" : "↑"}
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
        <OnlinePatientsChart />
      </div>
    </div>
  );
};

export default Card;
