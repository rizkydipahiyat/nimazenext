import React from "react";

const GenreHomeCard = ({ genres }) => {
  return (
    <div className="flex">
      {genres?.slice(0, 4).map((genre, item) => {
        return (
          <div key={`${genre}-${item + 329}`}>
            <span className="p-1 text-slate-200">{genre}</span>
          </div>
        );
      })}
    </div>
  );
};

export default GenreHomeCard;
