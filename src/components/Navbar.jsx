import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import logo from "../images/logo.png"
const Navbar = ({ setSearchQuery, setCurrentPage }) => {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);

  const toggleButton = () => {
    setToggle((perv) => !perv);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchQuery(search);
      // setCurrentPage(1);
    }
  };

  return (
    <>
      <header>
        <nav>
          <div className=" p-4 flex justify-between items-center mx-auto">
            {/* logo div */}
            <div>
              <a href="/">
                <img
                  src={logo}
                  alt="Logo"
                  height={160}
                  width={120}
                />
              </a>
            </div>

            {/* search-bar div */}
            <div className="max-w-lg w-full bg-Dark p-1 rounded-lg shadow-md">
              <div className="relative max-w-lg w-full bg-Dark p-1 rounded-lg shadow-md">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  className="w-full bg-Dark pl-10 px-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:border-gray-700 text-white placeholder:font-Kanit"
                  placeholder="Search Movies"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            {/* links div */}

            <div className=" max-lg:block ">
              <span onClick={toggleButton}>
                {toggle ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
                <div
                  className={`${
                    toggle ? "flex" : "hidden"
                  } p-6 sideBarBg absolute top-20 right-0 mx-2 my-1 min-w-[140px] rounded-lg sidebar`}
                >
                  <ul className="list-none flex flex-col justify-end items-center flex-1 md:gap-3">
                    <Link
                      className="font-Kanit font-normal block py-2 px-3  rounded md:p-0 text-white  hover:text-Primary"
                      to="/"
                    >
                      Home
                    </Link>
                    <Link
                      className="font-Kanit font-normal block py-2 px-3  rounded md:p-0 text-white hover:text-Primary"
                      to="/Popularmovies"
                    >
                      Popular Movies
                    </Link>
                    <Link
                      className="font-Kanit font-normal block py-2 px-3  rounded md:p-0 text-white hover:text-Primary"
                      to="/tvShows"
                    >
                      TV Shows
                    </Link>
                    <Link
                      className="font-Kanit font-normal block py-2 px-3  rounded md:p-0 text-white hover:text-Primary"
                      to="/aboutme"
                    >
                      About me
                    </Link>
                  </ul>
                  
                </div>
              </span>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
