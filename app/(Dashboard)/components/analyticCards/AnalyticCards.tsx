"use client";

import React from "react";
import Card from "../card/Card";
import { useCalender } from "../calender/useCalender";

const AnalyticCards = () => {
  const { events } = useCalender();
  const onlineConsultations = events?.filter(
    (event) => event.appointmentType === "Online_Consultation"
  );
  const offlineConsultations = events?.filter(
    (event) => event.appointmentType === "Offline_Consultation"
  );
  const totalPatients =
    onlineConsultations?.length + offlineConsultations?.length;

  return (
    <>
      <div className="flex mt-7 gap-4 w-full justify-between">
        <Card
          title="Online consultations"
          number={onlineConsultations?.length || 0}
          value="+24.54%"
          data={onlineConsultations}
        />
        <Card
          title="Offline consultations"
          number={offlineConsultations?.length || 0}
          value="-64.8%"
          dcrement
          data={offlineConsultations}
        />
        <Card
          title="Total consultations"
          number={totalPatients || 0}
          value="+10.7%"
          data={events}
        />
      </div>
    </>
  );
};

export default AnalyticCards;
