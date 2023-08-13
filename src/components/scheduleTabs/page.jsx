"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";

const ScheduleTabs = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const weekday = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const currentDate = new Date();
  const currentDayIndex = currentDate.getDay();

  useEffect(() => {
    setSelectedIndex(currentDayIndex); // Set the selected index based on the current day
  }, [currentDayIndex]);

  return (
    <div className="container mx-auto">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex flex-wrap mt-5 gap-y-3 gap-x-3 items-center justify-center lg:gap-x-3 lg:mt-5">
          {weekday.map((day, index) => (
            <Tab
              key={index}
              className={`${
                selectedIndex === index
                  ? "bg-slate-900 text-slate-200"
                  : "bg-slate-100 text-slate-900"
              } py-2 px-5 rounded-3xl`}>
              {day}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="flex items-center justify-center">
          <Tab.Panel className="grid grid-cols-2 lg:grid-cols-5 gap-5 py-10">
            {data[0].senin.map((anime) => {
              return (
                <div className="relative" key={anime.animeId}>
                  <Link href={`${anime.slug}`}>
                    <div className="eps absolute top-3 left-2">
                      <span className="bg-neutral-700 text-[9px] lg:text-sm text-slate-200 py-2 px-2 text-center rounded-md">
                        {anime.totalEps}
                      </span>
                    </div>
                    <div className="type absolute top-3 right-2">
                      <span className="bg-neutral-700 text-[9px] lg:text-sm text-slate-200 py-2 px-2 text-center rounded-md">
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
                    <span className="title absolute bottom-8 font-semibold ml-2 text-xs">
                      {anime.title}
                    </span>
                    <div className="genre absolute bottom-3">
                      {anime.genres.slice(0, 3).map((genre, item) => {
                        return (
                          <span
                            key={item}
                            className="font-thin ml-2 text-[8px] lg:text-xs">
                            {genre}
                          </span>
                        );
                      })}
                    </div>
                  </Link>
                </div>
              );
            })}
          </Tab.Panel>
          <Tab.Panel className="grid grid-cols-2 lg:grid-cols-5 gap-5 py-10">
            {data[0].selasa.map((anime) => {
              return (
                <div key={anime.animeId} className="relative">
                  <Link href={`${anime.slug}`}>
                    <div className="eps absolute top-3 left-2">
                      <span className="bg-neutral-700 text-[9px] lg:text-sm text-slate-200 py-2 px-2 text-center rounded-md">
                        {anime.totalEps}
                      </span>
                    </div>
                    <div className="type absolute top-3 right-2">
                      <span className="bg-neutral-700 text-[9px] lg:text-sm text-slate-200 py-2 px-2 text-center rounded-md">
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
                    <span className="title absolute bottom-8 font-semibold ml-2 text-xs">
                      {anime.title}
                    </span>
                    <div className="genre absolute bottom-3">
                      {anime.genres.slice(0, 3).map((genre, item) => {
                        return (
                          <span
                            key={item}
                            className="font-thin ml-2 text-[8px] lg:text-xs">
                            {genre}
                          </span>
                        );
                      })}
                    </div>
                  </Link>
                </div>
              );
            })}
          </Tab.Panel>
          <Tab.Panel className="grid grid-cols-2 lg:grid-cols-5 gap-5 py-10">
            {data[0].rabu.map((anime) => {
              return (
                <div className="relative" key={anime.animeId}>
                  <Link href={`${anime.slug}`}>
                    <div className="eps absolute top-3 left-2">
                      <span className="bg-neutral-700 text-[9px] lg:text-sm text-slate-200 py-2 px-2 text-center rounded-md">
                        {anime.totalEps}
                      </span>
                    </div>
                    <div className="type absolute top-3 right-2">
                      <span className="bg-neutral-700 text-[9px] lg:text-sm text-slate-200 py-2 px-2 text-center rounded-md">
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
                    <span className="title absolute bottom-8 font-semibold ml-2 text-xs">
                      {anime.title}
                    </span>
                    <div className="genre absolute bottom-3">
                      {anime.genres.slice(0, 3).map((genre, item) => {
                        return (
                          <span
                            className="font-thin ml-2 text-[8px] lg:text-xs"
                            key={item}>
                            {genre}
                          </span>
                        );
                      })}
                    </div>
                  </Link>
                </div>
              );
            })}
          </Tab.Panel>
          <Tab.Panel className="grid grid-cols-2 lg:grid-cols-5 gap-5 py-10">
            {data[0].kamis.map((anime) => {
              return (
                <div className="relative" key={anime.animeId}>
                  <Link href={`${anime.slug}`}>
                    <div className="eps absolute top-3 left-2">
                      <span className="bg-neutral-700 text-[9px] lg:text-sm text-slate-200 py-2 px-2 text-center rounded-md">
                        {anime.totalEps}
                      </span>
                    </div>
                    <div className="type absolute top-3 right-2">
                      <span className="bg-neutral-700 text-[9px] lg:text-sm text-slate-200 py-2 px-2 text-center rounded-md">
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
                    <span className="title absolute bottom-8 font-semibold ml-2 text-xs">
                      {anime.title}
                    </span>
                    <div className="genre absolute bottom-3">
                      {anime.genres.slice(0, 3).map((genre, item) => {
                        return (
                          <span
                            key={item}
                            className="font-thin ml-2 text-[8px] lg:text-xs">
                            {genre}
                          </span>
                        );
                      })}
                    </div>
                  </Link>
                </div>
              );
            })}
          </Tab.Panel>
          <Tab.Panel className="grid grid-cols-2 lg:grid-cols-5 gap-5 py-10">
            {data[0].jumat.map((anime) => {
              return (
                <div className="relative" key={anime.animeId}>
                  <Link href={`${anime.slug}`}>
                    <div className="eps absolute top-3 left-2">
                      <span className="bg-neutral-700 text-[9px] lg:text-sm text-slate-200 py-2 px-2 text-center rounded-md">
                        {anime.totalEps}
                      </span>
                    </div>
                    <div className="type absolute top-3 right-2">
                      <span className="bg-neutral-700 text-[9px] lg:text-sm text-slate-200 py-2 px-2 text-center rounded-md">
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
                    <span className="title absolute bottom-8 font-semibold ml-2 text-xs">
                      {anime.title}
                    </span>
                    <div className="genre absolute bottom-3">
                      {anime.genres.slice(0, 3).map((genre, item) => {
                        return (
                          <span
                            key={item}
                            className="font-thin ml-2 text-[8px] lg:text-xs">
                            {genre}
                          </span>
                        );
                      })}
                    </div>
                  </Link>
                </div>
              );
            })}
          </Tab.Panel>
          <Tab.Panel className="grid grid-cols-2 lg:grid-cols-5 gap-5 py-10">
            {data[0].sabtu.map((anime) => {
              return (
                <div className="relative" key={anime.animeId}>
                  <Link href={`${anime.slug}`}>
                    <div className="eps absolute top-3 left-2">
                      <span className="bg-neutral-700 text-[9px] lg:text-sm text-slate-200 py-2 px-2 text-center rounded-md">
                        {anime.totalEps}
                      </span>
                    </div>
                    <div className="type absolute top-3 right-2">
                      <span className="bg-neutral-700 text-[9px] lg:text-sm text-slate-200 py-2 px-2 text-center rounded-md">
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
                    <span className="title absolute bottom-8 font-semibold ml-2 text-xs">
                      {anime.title}
                    </span>
                    <div className="genre absolute bottom-3">
                      {anime.genres.slice(0, 3).map((genre, item) => {
                        return (
                          <span
                            key={item}
                            className="font-thin ml-2 text-[8px] lg:text-xs">
                            {genre}
                          </span>
                        );
                      })}
                    </div>
                  </Link>
                </div>
              );
            })}
          </Tab.Panel>
          <Tab.Panel className="grid grid-cols-2 lg:grid-cols-5 gap-5 py-10">
            {data[0].minggu.map((anime) => {
              return (
                <div className="relative" key={anime.animeId}>
                  <Link href={`${anime.slug}`}>
                    <div className="eps absolute top-3 left-2">
                      <span className="bg-neutral-700 text-[9px] lg:text-sm text-slate-200 py-2 px-2 text-center rounded-md">
                        {anime.totalEps}
                      </span>
                    </div>
                    <div className="type absolute top-3 right-2">
                      <span className="bg-neutral-700 text-[9px] lg:text-sm text-slate-200 py-2 px-2 text-center rounded-md">
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
                    <span className="title absolute bottom-8 font-semibold ml-2 text-xs">
                      {anime.title}
                    </span>
                    <div className="genre absolute bottom-3">
                      {anime.genres.slice(0, 3).map((genre, item) => {
                        return (
                          <Fragment
                            className="font-thin ml-2 text-[8px] lg:text-xs"
                            key={item + 1}>
                            {genre}
                          </Fragment>
                        );
                      })}
                    </div>
                  </Link>
                </div>
              );
            })}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ScheduleTabs;
