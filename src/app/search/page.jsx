import { getBaseUrl } from "@/lib/getBaseUrl";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const getSearch = async (query) => {
  const res = await fetch(`${getBaseUrl()}/api/search?query=${query}`, {
    headers: { "content-type": "application/json" },
    next: { revalidate: 60 },
  });
  const json = res.json();
  return json;
};

export default async function Search({ searchParams }) {
  const { query } = searchParams;

  if (!query) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-slate-100">
        <p>Ketikan kata dalam kotak pencarian</p>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center px-4 z-10 text-slate-100 mt-5">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Suspense fallback={"Searching...."}>
          <SearchResult query={query} />
        </Suspense>
      </div>
    </div>
  );
}

const SearchResult = async ({ query }) => {
  const result = await getSearch(query);
  if (!result) {
    return (
      <div className="text-center w-full col-span-6">
        <p>Hasil tidak ditemukan</p>
      </div>
    );
  }

  return result?.data?.datas[0]?.listAnime?.map((anime, index) => {
    return (
      <>
        <div className="relative">
          <Link href={`${anime.slug}`}>
            <div className="eps absolute top-3 left-2">
              <span className="bg-neutral-700 text-sm text-slate-200 py-2 px-2 text-center rounded-md">
                {anime.type}
              </span>
            </div>
            <Image
              width={0}
              height={0}
              sizes="100vh"
              src={anime.image}
              alt={anime.title}
              className="w-[200px] h-[250px] rounded-md lg:w-[200px] lg:h-[280px]"
            />
            <div className="absolute bottom-0  h-2/4 w-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
            <span className="title absolute bottom-3 font-semibold ml-2 text-xs">
              {anime.title}
            </span>
          </Link>
        </div>
      </>
    );
  });
};
