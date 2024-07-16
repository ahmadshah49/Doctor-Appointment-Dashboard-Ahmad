import getCurrentUser from "@/app/action/getCurrentUser";

const DashboardSchedule = async () => {
  const session = await getCurrentUser();
  return (
    <div className=" rounded-md bg-white shadow-md p-4">
      <h1 className="text-gray-950 py-4 font-semibold">
        Email{session?.email}
      </h1>
    </div>
  );
};

export default DashboardSchedule;
