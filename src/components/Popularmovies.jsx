import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Navbar, Pagination, SkeletonCard } from "./index.js";

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchTopMovies = async (page) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching top movies:", error);
    return { results: [], total_pages: 0 };
  }
};

const PopularMovies = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchPopularMovies = async (page) => {
    try {
      setLoading(true);
      const movieData = await fetchTopMovies(page);
      setData(movieData.results);
      setTotalPages(movieData.total_pages);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching popular movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies(currentPage);
  }, [currentPage]);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="bg-Dark">
        <Navbar setSearchQuery={setSearchQuery} />
        <div className="flex flex-wrap justify-center">
          {loading ? (
            <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-Dark">
              <SkeletonCard />
            </div>
          ) : (
            filteredData.map((data, index) => (
              <Card cardData={data} key={index} />
            ))
          )}
        </div>
        <Pagination
          totalPosts={filteredData.length}
          postPerPage={40}
          setCurrentPage={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
      <footer className="mt-auto py-4 text-center text-gray-400">
        <p>© 2025 Burnflix</p>
      </footer>
    </>
  );
};

export default PopularMovies;
