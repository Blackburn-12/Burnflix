import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Card from "./Card";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const TvShows = () => {
  const [shows, setShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const postPerPage = 20; // Assuming 20 results per page as per the TMDB API
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  // Fetch TV shows data based on searchQuery and currentPage
  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        let url = "";
        
        // If searchQuery is empty, fetch top-rated series; otherwise, fetch search results
        if (searchQuery.trim() === "") {
          url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=${currentPage}`;
        } else {
          url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchQuery}&page=${currentPage}`;
        }
        
        const response = await axios.get(url);
        setShows(response.data.results);
        setTotalPages(response.data.total_pages); // Use TMDB-provided total pages
      } catch (error) {
        console.error("Error fetching TV shows:", error);
        setShows([]); // Clear shows if an error occurs
      }
    };

    fetchTvShows();
  }, [currentPage, searchQuery]); // Re-fetch data whenever currentPage or searchQuery changes

  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} />
      <div className="min-h-screen bg-Dark text-white">
        <div className="flex flex-wrap justify-center gap-6">
          {shows.map((show) => (
            <div
              key={show.id}
              className="imdb-card max-w-sm rounded overflow-hidden shadow-lg m-2 bg-[#1C1B1B] p-4"
              onClick={() => navigate(`/tvShows/${show.id}`)} // Add the onClick here
              style={{ cursor: "pointer" }} // Add cursor styling for better UX
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                className="rounded mb-4"
              />
              <h2 className="imdb-card-title font-Kanit">{show.name}</h2>
              <div className="flex justify-start items-center gap-1">
                <img
                  className="w-4 h-4"
                  src="https://freepngtransparent.com/wp-content/uploads/2023/03/Star-Png-164.png"
                  alt="Star Icon"
                />
                <span className="text-sm font-Kanit text-gray-300">
                  {show.vote_average.toFixed(1)}
                </span>
              </div>
              <p className="imdb-card-release-date font-Kanit">
                Release Date:
                <br />
                {show.first_air_date}
              </p>
            </div>
          ))}
        </div>

        {totalPages > 0 && (
          <Pagination
            totalPosts={shows.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>
      <footer className="mt-auto py-4 text-center text-gray-400">
        <p>© 2025 Burnflix</p>
      </footer>
    </>
  );
};

export default TvShows;
