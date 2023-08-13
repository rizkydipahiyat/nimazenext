"use client";
import Image from "next/image";
import React from "react";

const PopulerCard = ({ title, slug, image, genres, rank }) => {
  const getBackgroundColor = (i) => {
    if (i === 1) {
      return "bg-gradient-to-r from-amber-400 to-amber-200";
    } else if (i === 2) {
      return "bg-gradient-to-r from-slate-500 to-slate-300";
    } else if (i === 3) {
      return "bg-gradient-to-r from-yellow-800 to-yellow-600";
    } else {
      return "bg-slate-500";
    }
  };
  return (
    <div className="flex text-slate-200 bg-neutral-950 rounded-md">
      <div className="basis-1/2 p-2 relative">
        <Image
          src={image}
          alt={title}
          width={0}
          height={0}
          sizes="100vh"
          className="w-full h-full"
        />
        <span
          className={`${getBackgroundColor(
            rank
          )} rank absolute top-0 left-0 bg-slate-500 px-4 py-1 rounded-br-lg rounded-bl-lg`}>
          {rank}
        </span>
      </div>
      <div className="basis-1/2 py-5">
        <div className="flex flex-col">
          <span className="title text-sm font-semibold">{title}</span>
          <span className="genreInfo text-sm font-normal">Genre: </span>
          {genres.map((genre, index) => {
            return (
              <div key={index + 1}>
                <span className="genres text-sm text-justify font-thin">
                  {genre.replace("Genre :", "")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopulerCard;
