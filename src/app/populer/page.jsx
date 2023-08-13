import PopulerCard from "@/components/populerCard/PopulerCard";
import React from "react";

const getPopulerAnime = async () => {
  const populer = await fetch(`${process.env.NEXTAUTH_URL}/api/populer`, {
    headers: { "content-type": "application/json" },
    cache: "no-store",
  });
  const json = await populer.json();
  return json;
};

export default async function Populer() {
  const { data } = await getPopulerAnime();
  return (
    <div className="container mx-auto px-2 text-slate-100">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg lg:text-2xl">Top Anime</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-5 lg:gap-2">
        {data.map((anime, index) => {
          return (
            <PopulerCard
              title={anime.title}
              slug={anime.slug}
              image={anime.image}
              genres={anime.genres}
              rank={anime.rank}
              key={index + 369}
            />
          );
        })}
      </div>
    </div>
  );
}
