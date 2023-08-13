import DetailAnimeCard from "@/components/detailAnimeCard/page";
import Link from "next/link";
import React from "react";

const getDetailAnime = async (slug) => {
  const detail = await fetch(`${process.env.NEXTAUTH_URL}/api/anime/${slug}`, {
    headers: { "content-type": "application/json" },
    cache: "no-store",
  });

  const json = await detail.json();
  return json;
};
export default async function Detail({ params }) {
  const slug = params.slug[0];
  const { data } = await getDetailAnime(slug);
  return (
    <div className="container mx-auto text-slate-200 px-2">
      <DetailAnimeCard data={data[0]} />
      <div className="flex flex-col text-center  mt-5 mb-5">
        {data[0].listEpisode.map((list, index) => {
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
  );
}
