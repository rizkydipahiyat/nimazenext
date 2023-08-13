import React from "react";
import InputSearch from "@/components/InputSearch/Search";

const LayoutSearch = ({ children }) => {
  return (
    <>
      <InputSearch />
      {children}
    </>
  );
};

export default LayoutSearch;
