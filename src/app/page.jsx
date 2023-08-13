import CarouselCard from "@/components/carouselCard/CarouselCard";
import LatestCard from "@/components/latestCard/LatestCard";
import { getTopAnime } from "@/lib/getTopAnime";

export default async function Home() {
  const topAnimes = await getTopAnime();
  return (
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 mt-3 gap-5 lg:gap-2">
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
  );
}
