"use client";

import Link from "next/link";
import React from "react";
import { FaAngleLeft, FaListOl, FaAngleRight } from "react-icons/fa6";

const WatchCard = ({ watch }) => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center">
        <iframe
          src={watch.embed}
          className="w-full h-[220px] lg:h-[620px] mb-3 justify-center mt-5"
          allowFullScreen></iframe>
      </div>
      <span className="title py-2 font-semibold lg:text-xl">
        {watch?.title}
      </span>
      <div className="title-section mt-3">
        <div className="flex items-center justify-between lg:justify-center gap-x-1">
          <div className="prev w-full">
            <Link
              href={`${watch?.prev}`}
              className="flex items-center justify-center bg-slate-500 py-1 rounded-md gap-x-2">
              <FaAngleLeft /> Prev
            </Link>
          </div>
          <div className="detail w-full">
            <Link
              href={`${watch?.detail}`}
              className="flex items-center justify-center bg-slate-500 py-1 rounded-md gap-x-2">
              <FaListOl /> Detail
            </Link>
          </div>
          <div className="next w-full">
            <Link
              href={`${watch?.next}`}
              className="flex items-center justify-center bg-slate-500 py-1 rounded-md gap-x-2">
              Next
              <FaAngleRight />
            </Link>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 mt-3">
          <span className="bg-neutral-900 text-[10px] lg:text-sm text-slate-200 p-1 rounded-sm">
            Anime
          </span>
          {watch?.genres?.slice(0, 4)?.map((genre, i) => {
            return (
              <div key={i + 1}>
                <span className="bg-neutral-400 text-[10px] lg:text-sm text-white p-1 rounded-sm">
                  {genre}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-justify">{watch?.synopsis}</p>
      </div>
    </div>
  );
};

export default WatchCard;
