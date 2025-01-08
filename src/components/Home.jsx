import React, { useState, useEffect } from "react";
import { Card, SkeletonCard, Pagination, Navbar } from "./index";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(40);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setIsLoading(true);
    if (searchQuery.trim() === "") {
      fetchData(currentPage);
    } else {
      fetchSearchData(searchQuery, currentPage);
    }
  }, [currentPage, searchQuery]);

  const fetchData = async (page) => {
    try {
      const movieData = await fetchMovies(page);
      setData(movieData.results);
      setTotalPages(movieData.total_pages);
    } catch (error) {
      console.log("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchData = async (query, page) => {
    try {
      let allMovies = [];
      for (let pageNum = 1; pageNum <= page; pageNum++) {
        const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${pageNum}`;
        const [movieResponse] = await Promise.all([axios.get(movieUrl)]);
        allMovies = allMovies.concat(movieResponse.data.results);
      }

      allMovies.sort((a, b) => b.vote_count - a.vote_count);
      const totalPages = Math.ceil(allMovies.length / postPerPage);
      setTotalPages(totalPages);
      const startIndex = (currentPage - 1) * postPerPage;
      const endIndex = currentPage * postPerPage;
      setData(allMovies.slice(startIndex, endIndex));
    } catch (error) {
      console.error("Error fetching searched movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="min-h-screen bg-dark">
      {/* Restored original navbar */}
      <Navbar setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} />

      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="w-full h-screen overflow-hidden flex justify-center items-center bg-dark">
            <SkeletonCard />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 min-[425px]:grid-cols-2 min-[768px]:grid-cols-3 min-[1024px]:grid-cols-4 min-[1440px]:grid-cols-5 gap-4">
              {data.length > 0 ? (
                data.map((movie, index) => (
                  <div 
                    className="w-full transform transition-transform duration-300 hover:scale-105" 
                    key={movie.id || index}
                  >
                    <Card cardData={movie} />
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <p className="text-gray-400 text-lg">No movies found</p>
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Return to Popular Movies
                  </button>
                </div>
              )}
            </div>

            {data.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  totalPosts={data.length}
                  postPerPage={postPerPage}
                  setCurrentPage={handlePageChange}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </div>
            )}
          </>
        )}
      </main>

      <footer className="mt-auto py-4 text-center text-gray-400">
        <p>© 2025 Burnflix</p>
      </footer>
    </div>
  );
};

export default Home;