"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const InputSearch = () => {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    if (query.trim() !== "") {
      const encodedQuery = encodeURIComponent(query);
      router.push(`/search?query=${encodedQuery}`);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key == "Enter" && handleSearch()}
          className="lg:w-1/2 outline-none text-slate-800 rounded-xl placeholder:px-1 placeholder:text-slate-800 placeholder:font-semibold p-3"
          placeholder="Search Anime"
        />
        <IoSearchSharp
          className="text-slate-100"
          size={30}
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default InputSearch;
