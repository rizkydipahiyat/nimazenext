"use client";

import Image from "next/image";
import React from "react";

const DetailAnimeCard = ({ data }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-center">
      <div className="basis-1/4">
        <Image
          width={0}
          height={0}
          sizes="100vh"
          src={data.image}
          alt={data.title}
          className="w-[320px] h-[450px] p-4"
        />
      </div>
      <div className="basis-1/2 mt-3">
        <div className="data-anime">
          <span className="title font-bold text-2xl">
            {data.title.replace("English:", "")}
          </span>
          <p className="text-justify mt-5">{data.synopsis}</p>
          <div className="box-detail flex flex-wrap mt-5">
            <div>
              <h3 className="text-xl font-semibold">Information</h3>
              <ul className="text-sm">
                <li>Score: {data.score}</li>
                <li>Type: {data.type}</li>
                <li>Episodes: {data.episodes}</li>
                <li>Status: {data.status}</li>
                <li>Rating: {data.rating}</li>
                <li>Season: {data.date}</li>
                <li>Members: {data.members.replace("Members:", "")}</li>
                <li className="flex items-center gap-1">
                  Genres:
                  {data.genres.map((genre, index) => {
                    return (
                      <div key={index}>
                        <span>{genre}</span>
                      </div>
                    );
                  })}
                </li>
              </ul>
            </div>
            <div className="lg:px-10 lg:py-7">
              <ul className="text-sm">
                <li>
                  Popularity: {data.popularity.replace("Popularity:", "")}
                </li>
                <li>Studio: {data.studio}</li>
                <li>Duration: {data.duration}</li>
                <li>Rating: {data.rating}</li>
                <li>Aired: {data.aired.replace("Aired:", "")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAnimeCard;
