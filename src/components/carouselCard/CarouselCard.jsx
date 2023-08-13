"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { IoPlayCircleOutline, IoStar } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import GenreHomeCard from "../genreHomeCard/page";

const CarouselCard = ({ data }) => {
  return (
    <Swiper
      spaceBetween={30}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="w-full h-full">
      {data?.map((anime, i) => {
        return (
          <div key={`${anime.title}-${i + 2000}`}>
            <Link href={`${anime.slug}`}>
              <SwiperSlide className="relative flex justify-center items-center text-lg text-center">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  src={anime?.image}
                  alt={anime?.title}
                  className="w-full h-[230px] filter blur-sm object-cover lg:object-cover lg:h-[500px] lg:filter lg:blur-md"
                />
                <div className="absolute bottom-0  h-3/4 w-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
                <div className="absolute lg:w-full flex items-center justify-center top-7 lg:top-[75px]">
                  <div className="w-1/2 text-left px-5 lg:px-20 lg:space-y-3">
                    <span className="text-slate-200 text-[9px] font-medium lg:font-bold lg:text-3xl">
                      <Link href={`${anime.slug}`}>{anime.title}</Link>
                    </span>
                    <div className="flex items-center justify-center w-10 bg-neutral-700 lg:p-1 text-slate-200 lg:w-16 gap-x-1">
                      <IoStar className="text-white text-[9px] font-normal lg:text-sm lg:font-normal" />
                      <span className="text-white text-[9px] bottom-10 lg:text-[12px] lg:font-medium">
                        {anime?.score}
                      </span>
                    </div>
                    <div className=" text-white space-x-1 text-left font-thin text-[9px]  lg:space-x-2 lg:text-md lg:text-left lg:bottom-20 lg:text-[12px] lg:font-normal lg:left-10">
                      <GenreHomeCard genres={anime.genres} />
                    </div>
                    <div className="text-left -ml-1 mb-3">
                      <Link href={`${`${anime.slug}`}`}>
                        <IoPlayCircleOutline size={40} />
                      </Link>
                    </div>
                  </div>
                  <div className="w-1/2 px-10">
                    <Link href={`${anime.slug}`}>
                      <Image
                        width="0"
                        height="0"
                        sizes="100vw"
                        src={anime.image}
                        alt={anime?.title}
                        className=" w-[100px] h-[150px] object-cover lg:w-full lg:h-[325px] lg:object-contain"
                      />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            </Link>
          </div>
        );
      })}
    </Swiper>
  );
};

export default CarouselCard;
