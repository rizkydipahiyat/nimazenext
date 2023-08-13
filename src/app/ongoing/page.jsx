"use client";
import OngoingCard from "@/components/ongoingCard/OngoingCard";
import { getBaseUrl } from "@/lib/getBaseUrl";
import React, { useEffect, useState } from "react";

const Ongoing = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getOngoingAnime = async () => {
      setLoading(true);
      const ongoing = await fetch(`${getBaseUrl()}/api/ongoing`, {
        headers: { "content-type": "application/json" },
        next: { revalidate: 60 },
      });
      const result = await ongoing.json();
      setData(result.data);
      setLoading(false);
    };
    getOngoingAnime();
  }, []);

  return (
    <>
      {loading ? (
        <span className="text-slate-200">Loading...</span>
      ) : (
        <div className="container mx-auto px-2 text-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm lg:text-2xl">Ongoing</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mt-3 gap-5 lg:gap-2">
            {data?.slice(0, 14).map((anime, idx) => {
              return (
                <OngoingCard
                  slug={anime.slug}
                  score={anime.score}
                  image={anime.image}
                  title={anime.title}
                  key={`${anime.title}-${idx}`}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Ongoing;
