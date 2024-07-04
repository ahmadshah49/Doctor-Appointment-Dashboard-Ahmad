const PatientTable = () => {
  const sampleData = [
    {
      id: 1,
      name: "John Doe",
      diagnosis: "Flu",
      status: "Recovered",
      lastAppointment: "2024-06-01",
      nextAppointment: "2024-07-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      diagnosis: "Diabetes",
      status: "Ongoing",
      lastAppointment: "2024-06-15",
      nextAppointment: "2024-07-15",
    },
    {
      id: 3,
      name: "Sam Johnson",
      diagnosis: "Hypertension",
      status: "Under Treatment",
      lastAppointment: "2024-05-20",
      nextAppointment: "2024-07-20",
    },
    {
      id: 4,
      name: "Alice Brown",
      diagnosis: "Asthma",
      status: "Stable",
      lastAppointment: "2024-06-10",
      nextAppointment: "2024-07-10",
    },
    {
      id: 5,
      name: "Bob White",
      diagnosis: "Covid-19",
      status: "Recovered",
      lastAppointment: "2024-05-30",
      nextAppointment: "2024-06-30",
    },
    {
      id: 6,
      name: "Cathy Green",
      diagnosis: "Bronchitis",
      status: "Under Treatment",
      lastAppointment: "2024-06-18",
      nextAppointment: "2024-07-18",
    },
    {
      id: 7,
      name: "David Black",
      diagnosis: "Pneumonia",
      status: "Recovered",
      lastAppointment: "2024-05-25",
      nextAppointment: "2024-07-25",
    },
    {
      id: 8,
      name: "Eva Blue",
      diagnosis: "Allergy",
      status: "Stable",
      lastAppointment: "2024-06-12",
      nextAppointment: "2024-07-12",
    },
    {
      id: 9,
      name: "Frank Yellow",
      diagnosis: "Arthritis",
      status: "Ongoing",
      lastAppointment: "2024-06-05",
      nextAppointment: "2024-07-05",
    },
    {
      id: 10,
      name: "Grace Violet",
      diagnosis: "Migraine",
      status: "Under Treatment",
      lastAppointment: "2024-06-03",
      nextAppointment: "2024-07-03",
    },
  ];
  return (
    <div className="p-4 px-6 shadow-md h-full">
      <table className="w-full ">
        <thead className="text-center h-16  border-b ">
          <tr>
            <th className="font-normal text-base text-gray-400">Name</th>
            <th className="font-normal text-base text-gray-400">Diagnosis</th>
            <th className="font-normal text-base text-gray-400">Status</th>
            <th className="font-normal text-base text-gray-400">
              Last Appointment
            </th>
            <th className="font-normal text-base text-gray-400">
              Next Appointment{" "}
            </th>
            <th className="font-normal text-base text-gray-400">Options </th>
          </tr>
        </thead>
        <tbody className="text-center ">
          {sampleData.map((item) => (
            <tr className="h-[72px]" key={item.id}>
              <td className="text-lg  font-normal">{item.name}</td>
              <td className="text-lg font-normal">{item.diagnosis}</td>
              <td className="text-lg font-normal">{item.status}</td>
              <td className="text-lg font-normal">{item.lastAppointment}</td>
              <td className="text-lg font-normal">{item.nextAppointment}</td>
              <td className="text-lg  text-gray-400 font-bold">...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
