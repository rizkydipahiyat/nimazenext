import React from "react";
import { RxLightningBolt } from "react-icons/rx";

const Navbar = () => {
  return (
    <div className="flex items-center justify-center mx-auto w-full py-5 px-10 text-slate-200">
      <h3 className="font-bold text-lg flex items-center gap-x-1">
        <RxLightningBolt size={20} />
        NIMAZE
      </h3>
    </div>
  );
};

export default Navbar;
