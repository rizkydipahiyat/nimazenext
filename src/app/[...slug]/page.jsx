import WatchCard from "@/components/watchCard/page";
import { getBaseUrl } from "@/lib/getBaseUrl";
import axios from "axios";
import React from "react";

async function getStreamAnime(slug) {
  const watch = await axios.get(`${getBaseUrl()}/api/${slug}`, {
    headers: { "content-type": "application/json" },
    next: { revalidate: 60 },
  });

  return watch.data;
}

export default async function Watch({ params }) {
  const slug = params.slug[0];

  const getStream = await getStreamAnime(slug);

  return (
    <div className="container mx-auto text-slate-200 mb-5">
      <WatchCard watch={getStream.data[0]} />
    </div>
  );
}
