import ScheduleTabs from "@/components/scheduleTabs/page";
import React from "react";

const getSchedules = async () => {
  const schedule = await fetch(`${process.env.BASE_URL}/api/schedules`, {
    headers: { "content-type": "application/json" },
    next: { revalidate: 60 * 60 },
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
      <ScheduleTabs data={getSchedule.data} />
    </div>
  );
};

export default Schedule;
