import React from "react";
import Navbar from "./Navbar";

const Aboutme = () => {
  return (
    <>
      <Navbar />
      <div className="bg-dark text-white min-h-screen flex items-center justify-center py-12">
        <div className="bg-gradient-to-r from-[#2c2f35] via-[#1c1c1e] to-[#212121] p-8 rounded-xl shadow-xl w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-yellow-400 mb-6">About Me</h1>
            <p className="text-lg font-medium text-gray-300 mb-4">
              I am a passionate web developer with a love for crafting clean, scalable code and creating seamless user experiences. 
              I'm driven by my curiosity and strive to learn and grow in every project I take on.
            </p>
          </div>

          {/* Profile Section */}
          <div className="flex justify-center items-center flex-col lg:flex-row lg:space-x-12 mb-12">
            <div className="lg:w-1/3">
              <img
                src="https://images.desenio.com/zoom/wb0125-8batman-portrait50x70-55544-10774.jpg"
                alt="Profile"
                className="rounded-full shadow-lg border-4 border-yellow-400"
              />
            </div>
            <div className="lg:w-2/3 mt-6 lg:mt-0">
              <h2 className="text-3xl font-semibold text-yellow-400 mb-4">Blackburn</h2>
              <p className="text-lg text-gray-300 mb-4">
                <span className="text-yellow-400 font-semibold">Quote:</span> "You either die a hero or live long enough to see yourself become the villain."
              </p>
              <p className="text-lg text-gray-300 mb-4">
                <span className="text-yellow-400 font-semibold">Email:</span> mhd.abdullah0126@gmail.com
              </p>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex justify-center space-x-12">
            <a
              href="https://www.linkedin.com/in/muhammad-abdullah-5242b1214/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-medium text-yellow-400 hover:text-yellow-500 transition duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/blackburn-12"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-medium text-yellow-400 hover:text-yellow-500 transition duration-300"
            >
              GitHub
            </a>
            <a
              href="https://burnfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-medium text-yellow-400 hover:text-yellow-500 transition duration-300"
            >
              Burnfolio
            </a>
          </div>
        </div>
      </div>
      <footer className="mt-auto py-4 text-center text-gray-400">
        <p>© 2025 Burnflix</p>
      </footer>
    </>
  );
};

export default Aboutme;
