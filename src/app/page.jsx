"use client";

import CarouselCard from "@/components/carouselCard/CarouselCard";
import LatestCard from "@/components/latestCard/LatestCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [topAnimes, setTopAnimes] = useState([]);

  useEffect(() => {
    const getTopAnime = async () => {
      setLoading(true);
      const res = await fetch(`/api/latest`);
      const result = await res.json();
      console.log("res", result);
      setTopAnimes(result);
      setLoading(false);
    };
    getTopAnime();
  }, []);
  console.log("res", topAnimes);

  return (
    <>
      {loading ? (
        <span className="text-slate-200">Loading...</span>
      ) : (
        <div className="container mx-auto text-slate-200 mb-5 lg:px-2">
          <div className="carousel-content">
            <CarouselCard data={topAnimes.popularSummer} />
          </div>
          <div className="ongoing-anime mt-3">
            <div className="tayang flex justify-between items-center">
              <h2 className="text-slate-200 font-bold text-sm lg:text-2xl">
                Latest Episodes
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-3 gap-5 md:gap-2">
              {topAnimes?.data?.map((anime) => {
                return (
                  <LatestCard
                    slug={anime.slug}
                    eps={anime.eps}
                    image={anime.image}
                    title={anime.title}
                    key={anime.title}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
