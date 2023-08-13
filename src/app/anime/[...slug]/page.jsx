"use client";

import DetailAnimeCard from "@/components/detailAnimeCard/DetailAnimeCard";
import { getBaseUrl } from "@/lib/getBaseUrl";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Detail({ params }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const slug = params?.slug[0] || "";

  useEffect(() => {
    const getDetailAnime = async () => {
      setLoading(true);
      try {
        const detail = await fetch(`${getBaseUrl()}/api/anime/${slug}`, {
          headers: { "content-type": "application/json" },
          next: { revalidate: 60 },
        });
        const result = await detail.json();
        setData(result.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    if (slug) {
      getDetailAnime(slug);
    }
  }, [slug]);

  return (
    <>
      {loading ? (
        <span className="text-slate-200">Loading...</span>
      ) : (
        <div className="container mx-auto text-slate-200 px-2">
          <DetailAnimeCard data={data} />
          <div className="flex flex-col text-center  mt-5 mb-5">
            {data?.listEpisode?.map((list, index) => {
              return (
                <div
                  className="text-center m-2 p-2 bg-neutral-900 rounded-md"
                  key={index + 1}>
                  <Link href={`${list.slug}`}>
                    <span>{list.title}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
