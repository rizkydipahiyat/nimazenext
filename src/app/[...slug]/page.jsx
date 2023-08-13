import WatchCard from "@/components/watchCard/page";
import React from "react";

const getStreamAnime = async (slug) => {
  const watch = await fetch(`${process.env.BASE_URL}/api/${slug}`, {
    headers: { "content-type": "application/json" },
    cache: "no-store",
  });
  const json = watch.json();
  return json;
};

export default async function Watch({ params }) {
  const slug = params.slug[0];

  const getStream = await getStreamAnime(slug);

  if (getStream?.data?.length === 0) {
    return (
      <div className="text-center">
        <p>Anime Tidak Ditemukan!</p>
      </div>
    );
  }

  const { data } = getStream;

  return (
    <div className="container mx-auto text-slate-200 mb-5">
      <WatchCard watch={data[0]} />
    </div>
  );
}
