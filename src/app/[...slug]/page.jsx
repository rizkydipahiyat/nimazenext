"use client";

import WatchCard from "@/components/watchCard/page";
import { getBaseUrl } from "@/lib/getBaseUrl";
import React, { useEffect, useState } from "react";

export default function Watch({ params }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const slug = params.slug[0];

  useEffect(() => {
    const getStreamAnime = async () => {
      setLoading(true);
      const watch = await fetch(`${getBaseUrl()}/api/${slug}`, {
        headers: { "content-type": "application/json" },
        next: { revalidate: 60 },
      });
      const result = await watch.json();
      setData(result.data[0]);
      setLoading(false);
    };
    getStreamAnime(slug);
  }, [slug]);

  return (
    <>
      {loading ? (
        <span className="text-slate-200">Loading...</span>
      ) : (
        <div className="container mx-auto text-slate-200 mb-5">
          <WatchCard watch={data} />
        </div>
      )}
    </>
  );
}
