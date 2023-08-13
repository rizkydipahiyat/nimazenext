import WatchCard from "@/components/watchCard/page";
import { getBaseUrl } from "@/lib/getBaseUrl";
import React from "react";

async function getStreamAnime(slug) {
  const watch = await fetch(`${getBaseUrl()}/api/${slug}`, {
    headers: { "content-type": "application/json" },
    next: { revalidate: 60 },
  });
  const json = watch.json();
  return json;
}

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
