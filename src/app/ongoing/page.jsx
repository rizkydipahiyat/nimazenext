import OngoingCard from "@/components/ongoingCard/OngoingCard";
import React from "react";

const getOngoingAnime = async () => {
  const ongoing = await fetch(`${process.env.NEXTAUTH_URL}/api/ongoing`, {
    headers: { "content-type": "application/json" },
    cache: "no-store",
  });
  const json = await ongoing.json();
  return json;
};
const Ongoing = async () => {
  const result = await getOngoingAnime();
  return (
    <div className="container mx-auto px-2 text-slate-100">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-sm lg:text-2xl">Ongoing</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mt-3 gap-5 lg:gap-2">
        {result?.data?.slice(0, 14).map((anime, idx) => {
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
  );
};

export default Ongoing;
