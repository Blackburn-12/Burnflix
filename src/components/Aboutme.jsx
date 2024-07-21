import React from "react";
import Navbar from "./Navbar";

const Aboutme = () => {
  return (
    <>
      <Navbar />
      <div className="bg-Dark text-white min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-80">
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">
              <span className="text-yellow-400">Name:</span> Blackburn
            </label>
          </div>
          <p className="mb-2">
            <span className="text-yellow-400 font-semibold">Remember</span> you
            either die a hero or live long enough to see yourself become the
            villain
          </p>
          <p className="mb-2">
            <span className="text-yellow-400 font-semibold">Email:</span>{" "}
            blackburrn7@gmail.com
          </p>
        </div>
      </div>
    </>
  );
};

export default Aboutme;
