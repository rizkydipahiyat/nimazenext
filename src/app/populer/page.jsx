import PopulerCard from "@/components/populerCard/PopulerCard";
import { getPopulerAnime } from "@/lib/getPopulerAnime";
import React from "react";

export default async function Populer() {
  const { data } = await getPopulerAnime();
  return (
    <div className="container mx-auto px-2 text-slate-100">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg lg:text-2xl">Top Anime</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-5 lg:gap-2">
        {data.length > 0 ? (
          data.map((anime, index) => {
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
          })
        ) : (
          <h3>No anime popular are currently in here</h3>
        )}
      </div>
    </div>
  );
}
