"use client";

import ScheduleTabs from "@/components/scheduleTabs/page";
import React, { useEffect, useState } from "react";

const Schedule = () => {
  const [loading, setLoading] = useState(false);
  const [getSchedule, setGetSchedule] = useState([]);

  useEffect(() => {
    const getSchedules = async () => {
      setLoading(true);
      const schedule = await fetch(`/api/schedules`, {
        headers: { "content-type": "application/json" },
        next: { revalidate: 60 },
      });
      const result = await schedule.json();
      setGetSchedule(result.data[0]);
      setLoading(false);
    };
    getSchedules();
  }, []);

  return (
    <>
      {loading ? (
        <span className="px-3 text-slate-200">Loading...</span>
      ) : (
        <div className="container mx-auto text-slate-200">
          <div className="flex items-center justify-center">
            <h2 className="font-bold text-2xl">Jadwal Rilis</h2>
          </div>
          <ScheduleTabs data={getSchedule} />
        </div>
      )}
    </>
  );
};

export default Schedule;
