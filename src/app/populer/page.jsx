"use client";

import PopulerCard from "@/components/populerCard/PopulerCard";
import React, { useEffect, useState } from "react";

export default function Populer() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPopulerAnime = async () => {
      setLoading(true);
      const populer = await fetch(`/api/populer`, {
        headers: { "content-type": "application/json" },
        next: { revalidate: 60 },
      });
      const result = await populer.json();
      setData(result.data);
      setLoading(false);
    };
    getPopulerAnime();
  }, []);

  return (
    <>
      {loading ? (
        <span className="px-3 text-slate-200">Loading...</span>
      ) : (
        <div className="container mx-auto px-2 text-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg lg:text-2xl">Top Anime</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-5 lg:gap-2">
            {data?.map((anime, index) => {
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
      )}
    </>
  );
}
