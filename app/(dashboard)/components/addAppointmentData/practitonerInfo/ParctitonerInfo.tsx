import getCurrentUser from "@/app/action/getCurrentUser";
import { RiUserLine } from "react-icons/ri";
const ParctitonerInfo = async () => {
  const currentUser = await getCurrentUser();
  return (
    <span className="flex flex-col items-center justify-center">
      <RiUserLine className="size-[17px] text-blue-500" />
      <h1 className="text-blue-500 text-[18px] font-normal">PRACTITIONER</h1>
      <p>{currentUser?.name}</p>
      <p>{currentUser?.companyName}</p>
    </span>
  );
};

export default ParctitonerInfo;
