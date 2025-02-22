"use client";

import { useCalender } from "../calender/useCalender";
import Card from "../card/Card";

const AnalyticCards = () => {
  const { offlineConsultations, onlineConsultations, totalPatients } =
    useCalender();

  return (
    <>
      <div className="flex xl:flex-row flex-col mt-3 gap-4  w-full justify-between">
        <Card
          title="Online consultations"
          number={onlineConsultations?.length || 0}
          value="+24.54%"
          onLinePatients
        />
        <Card
          title="Offline consultations"
          number={offlineConsultations?.length || 0}
          value="-64.8%"
          dcrement
          offLinePatients
        />
        <Card
          title="Total Patients"
          number={totalPatients || 0}
          totalPatients
        />
      </div>
    </>
  );
};

export default AnalyticCards;
