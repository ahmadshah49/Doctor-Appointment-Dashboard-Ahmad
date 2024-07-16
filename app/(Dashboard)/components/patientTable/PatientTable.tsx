import person from "@/public/images/person.png";
import Image from "next/image";
import ToogleButton from "../modals/addPatient/toogleButton/ToogleButton";

const PatientTable = () => {
  const sampleData = [
    {
      id: 1,
      name: "John Doe",
      diagnosis: "Flu",
      status: "Recovered",
      lastAppointment: "7/5/23",
      nextAppointment: "7/5/23",
      picture: null,
    },
    {
      id: 2,
      name: "Jane Smith",
      diagnosis: "Diabetes",
      status: "Ongoing",
      lastAppointment: "7/5/23",
      nextAppointment: "7/5/23",
      picture: null,
    },

    {
      id: 4,
      name: "Alice Brown",
      diagnosis: "Asthma",
      status: "On Treatment",
      lastAppointment: "7/5/23",
      nextAppointment: "7/5/23",
      picture: null,
    },
    {
      id: 5,
      name: "Bob White",
      diagnosis: "Covid-19",
      status: "Recovered",
      lastAppointment: "7/5/23",
      nextAppointment: "7/5/23",
      picture: null,
    },
    {
      id: 1,
      name: "John Doe",
      diagnosis: "Flu",
      status: "Recovered",
      lastAppointment: "7/5/23",
      nextAppointment: "7/5/23",
      picture: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Recovered":
        return "bg-green-200 text-green-800";
      case "Ongoing":
        return "bg-yellow-200 text-yellow-800";
      case "On Treatment":
        return "bg-red-200 text-red-800";

      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="p-4 px-6 rounded-md overflow-x-auto bg-white shadow-md h-full">
      <table className="w-full table-fixed min-w-[1000px]">
        <thead className="text-center h-16 border-b">
          <tr>
            <th className="w-1/7 font-normal text-base text-gray-400">Name</th>
            <th className="w-1/7 font-normal text-base text-gray-400">
              Diagnosis
            </th>
            <th className="w-1/7 font-normal text-base text-gray-400">
              Picture
            </th>
            <th className="w-1/7 font-normal text-base text-gray-400">
              Status
            </th>
            <th className="w-1/7 font-normal text-base text-gray-400">
              Appointment Date
            </th>

            <th className="w-1/7 font-normal text-base text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {sampleData.map((item) => (
            <tr className="h-[72px]" key={item.id}>
              <td className="text-lg font-normal">{item.name}</td>
              <td className="text-lg font-normal">{item.diagnosis}</td>
              <td className="text-lg font-normal">
                <Image
                  src={item.picture || person}
                  alt="patient image"
                  width={500}
                  height={500}
                  className="w-8 h-8 mx-auto rounded-full object-center object-cover"
                />
              </td>
              <td className="lg:text-lg md:text-base text-sm font-normal">
                <span
                  className={`lg:px-4 py-1 md:px-3 px-2 rounded-2xl ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </td>
              <td className="text-lg font-normal">{item.lastAppointment}</td>

              <td>
                <div className="flex  items-center  justify-evenly">
                  <ToogleButton
                    isUpdate
                    className=" rounded-md  hover:bg-blue-800 bg-blue-600 transition-colors ease-linear text-white font-semibold   px-3 py-1   "
                  >
                    Update
                  </ToogleButton>
                  <button className=" rounded-md  hover:bg-red-700 bg-red-600 transition-colors ease-linear text-white font-semibold   px-3 py-1   ">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
