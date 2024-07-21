import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, SkeletonCard, Pagination, Navbar } from "./index"; // Assuming these components handle movie display and pagination
import axios from "axios"; // Import axios for API requests
// Replace with your actual API key
const API_KEY = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(40); // Assuming constant for now
  const [totalPages, setTotalPages] = useState(0); // Store total pages

  // Handle pagination change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fetch data based on searchQuery and currentPage
  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchData(currentPage);
    } else {
      fetchSearchData(searchQuery, currentPage);
    }
  }, [currentPage, searchQuery]);

  // Fetch movies based on current page
  const fetchData = async (page) => {
    try {
      const movieData = await fetchMovies(page);
      setData(movieData.results);
      setTotalPages(movieData.total_pages);
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  // Fetch searched movies based on query and current page
  const fetchSearchData = async (query, page) => {
    try {
      let allMovies = [];
      for (let pageNum = 1; pageNum <= page; pageNum++) {
        const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${pageNum}`;

        const [movieResponse, seriesResponse] = await Promise.all([
          axios.get(movieUrl),
        ]);

        allMovies = allMovies.concat(
          movieResponse.data.results,
        );
      }

      allMovies.sort((a, b) => b.vote_count - a.vote_count);
      const totalPages = Math.ceil(allMovies.length / postPerPage);
      setTotalPages(totalPages);
      const startIndex = (currentPage - 1) * postPerPage;
      const endIndex = currentPage * postPerPage;
      setData(allMovies.slice(startIndex, endIndex));
    } catch (error) {
      console.error("Error fetching searched movies:", error);
    }
  };

  // Fetch popular movies from API
  const fetchMovies = async (page) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return { results: [], total_pages: 0 };
    }
  };

  return (
    <div className="bg-dark min-h-screen">
      {/* Navbar Component */}
      <Navbar setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} />

      <div className="flex flex-wrap justify-center bg-dark">
        {/* Displaying Movie Cards */}
        {data.length > 0 ? (
          data.map((movie, index) => <Card cardData={movie} key={index} />)
        ) : (
          <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-dark">
            <SkeletonCard />
          </div>
        )}
      </div>

      {/* Pagination Component */}
      <Pagination
        totalPosts={data.length} // Adjust if needed based on actual data structure
        postPerPage={postPerPage}
        setCurrentPage={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Home;
