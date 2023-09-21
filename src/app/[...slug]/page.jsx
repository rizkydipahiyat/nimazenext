"use client";

import WatchCard from "@/components/watchCard/page";
import React, { useEffect, useState } from "react";

export default function Watch({ params }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const slug = params?.slug[0] || "";

  useEffect(() => {
    const getStreamAnime = async () => {
      setLoading(true);
      try {
        const watch = await fetch(`/api/${slug}`);
        const result = await watch.json();
        setData(result.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    if (slug) {
      getStreamAnime(slug);
    }
  }, [slug]);

  return (
    <>
      {loading ? (
        <span className="px-3 text-slate-200">Loading...</span>
      ) : (
        <div className="container mx-auto text-slate-200 mb-5">
          <WatchCard watch={data} />
        </div>
      )}
    </>
  );
}
