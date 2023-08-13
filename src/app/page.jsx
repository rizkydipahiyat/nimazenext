import CarouselCard from "@/components/carouselCard/CarouselCard";
import LatestCard from "@/components/latestCard/LatestCard";
import { getBaseUrl } from "@/lib/getBaseUrl";

const getTopAnime = async () => {
  const latest = await fetch(`${getBaseUrl()}/api/latest`, {
    headers: {
      "content-type": "application/json",
    },
    next: { revalidate: 60 },
  });
  return latest.json();
};

export default async function Home() {
  const topAnimes = await getTopAnime();
  return (
    <div className="container mx-auto text-slate-200 mb-5 lg:px-2">
      <div className="carousel-content">
        {topAnimes.popularSummer.length > 0 ? (
          <CarouselCard data={topAnimes.popularSummer} />
        ) : (
          <h3>No anime are currently in here</h3>
        )}
      </div>
      <div className="ongoing-anime mt-3">
        <div className="tayang flex justify-between items-center">
          <h2 className="text-slate-200 font-bold text-sm lg:text-2xl">
            Latest Episodes
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 mt-3 gap-5 lg:gap-2">
          {topAnimes.data.length > 0 ? (
            topAnimes?.data?.map((anime) => {
              return (
                <LatestCard
                  slug={anime.slug}
                  eps={anime.eps}
                  image={anime.image}
                  title={anime.title}
                  key={anime.title}
                />
              );
            })
          ) : (
            <h3>No anime are currently in here</h3>
          )}
        </div>
      </div>
    </div>
  );
}
