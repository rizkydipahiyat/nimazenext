"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { RxCross1, RxTextAlignLeft } from "react-icons/rx";

const Sidebar = ({ children, Menus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [menuWidth, setMenuWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState("");
  const [isBlurred, setIsBlurred] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Set the height of the menu container based on its content when it becomes active
    if (isOpen && menuRef.current) {
      setMenuWidth(menuRef.current.scrollWidth);
      setIsBlurred(true);
    } else {
      // Reset the height when the menu is not active
      setMenuWidth(0);
      setIsBlurred(false);
    }
  }, [isOpen]);

  const handleMenu = (pathname) => {
    setCurrentPage(pathname.path);
  };
  return (
    <div className="container mx-auto px-4">
      <div className="flex">
        <div
          ref={menuRef}
          style={{ width: isOpen ? "280px" : "0" }}
          className={`${
            isOpen ? "sticky z-[1000] top-0" : ""
          } bg-neutral-900 h-screen relative transition-all ease-in-out duration-500`}>
          <div className="absolute flex items-center px-1 py-4">
            {isOpen ? (
              <div
                className="bg-neutral-900 ml-[210px] mt-4 p-1 rounded-md"
                onClick={handleOpen}>
                <RxCross1
                  size={24}
                  className={`${
                    isOpen ? "text-slate-200" : "text-neutral-950"
                  }`}
                />
              </div>
            ) : (
              <div
                className="bg-neutral-900 rounded-sm p-1"
                onClick={handleOpen}>
                <RxTextAlignLeft
                  size={24}
                  className={`${
                    isOpen ? "text-neutral-950" : "text-slate-200"
                  } `}
                />
              </div>
            )}
            {/* {!isOpen && <Navbar />} */}
          </div>
          <div className="text-slate-200 m-2">
            {isOpen && (
              <ul className="py-[80px] bg-neutral-800 rounded-md h-screen">
                {Menus &&
                  Menus.map((menu) => {
                    return (
                      <div key={menu.id}>
                        <Link
                          href={`${menu.path}`}
                          onClick={() => handleMenu(menu, menu.id)}>
                          <li
                            className={`${
                              currentPage === menu.path ? "bg-neutral-700" : ""
                            } flex items-center font-medium gap-x-5 py-3 px-5`}>
                            {menu.icon} {menu.name}
                          </li>
                        </Link>
                      </div>
                    );
                  })}
              </ul>
            )}
          </div>
        </div>
        <main
          style={{ width: isOpen ? "calc(100% - 280px)" : "100%" }}
          className={`${
            isBlurred ? "filter blur-lg" : "filter-none"
          } md:filter-none transition-all ease-in duration-500`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
