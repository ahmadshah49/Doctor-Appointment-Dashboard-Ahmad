import Image from "next/image";
import Patient from "@/public/images/patients.png";
const SideDashboard = () => {
  return (
    <div className=" w-full h-full bg-primary  px-8 items-center flex-col justify-center hidden md:flex ">
      <h1 className="text-white font-bold text-2xl py-4">
        ALL IN ONE DASHBOARD
      </h1>
      <Image
        src={Patient}
        alt="patient"
        width={5000}
        className="w-[600px] my-2"
      />
      <p className="text-white text-2xl font-normal my-10">
        Keep track of all patient information in this section.
      </p>
      <button
        disabled
        className="cursor-not-allowed text-xs font-normal flex items-center justify-center text-primary bg-white rounded-md px-4 py-2 border-none outline-none"
      >
        Learn More
      </button>
    </div>
  );
};

export default SideDashboard;
