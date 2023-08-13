import ScheduleTabs from "@/components/scheduleTabs/page";
import React from "react";

const getSchedules = async () => {
  const schedule = await fetch(`http://localhost:3000/api/schedules`, {
    headers: { "content-type": "application/json" },
    next: { revalidate: 60 },
  });
  const json = schedule.json();
  return json;
};
const Schedule = async () => {
  const getSchedule = await getSchedules();

  return (
    <div className="container mx-auto text-slate-200">
      <div className="flex items-center justify-center">
        <h2 className="font-bold text-2xl">Jadwal Rilis</h2>
      </div>
      {getSchedule.data.length > 0 ? (
        <ScheduleTabs data={getSchedule.data} />
      ) : (
        <h3>No schedule are currently in here</h3>
      )}
    </div>
  );
};

export default Schedule;
