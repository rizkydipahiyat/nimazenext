"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const LatestCard = ({ slug, eps, image, title }) => {
  return (
    <div className="relative">
      <Link href={`${slug}`}>
        <div className="eps absolute top-2 left-2">
          <span className="bg-neutral-700 text-sm text-slate-200 py-1 px-2 pb-2 text-center rounded-md">
            Episode {eps}
          </span>
        </div>
        <Image
          width={0}
          height={0}
          sizes="100vh"
          src={image}
          alt={title}
          className="w-[200px] h-[250px] rounded-md lg:w-[220px] lg:h-[300px]"
        />
        <div className="absolute bottom-0  h-2/4 w-full lg:w-[220px] bg-gradient-to-t from-neutral-900 to-transparent"></div>
        <span className="title absolute bottom-3 lg:w-[220px] md:px-2 font-semibold px-2 text-xs">
          {title}
        </span>
      </Link>
    </div>
  );
};

export default LatestCard;
