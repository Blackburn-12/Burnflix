import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Detailpage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const isMovie = window.location.pathname.startsWith("/movies");

  // Fetch Movie or TV Show Details and Recommendations
  const fetchData = async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    // Define the API URLs based on whether it's a movie or a TV show
    const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    const tvUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`;
    const recommendationsMovieUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`;
    const recommendationsTvUrl = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}`;

    // Fetch details based on type (movie or TV)
    const url = isMovie ? movieUrl : tvUrl;
    const response = await axios.get(url);
    setItem(response.data);

    // Fetch recommended movies or TV shows based on type
    const recommendationsUrl = isMovie
      ? recommendationsMovieUrl
      : recommendationsTvUrl;
    const recommendedResponse = await axios.get(recommendationsUrl);
    setRecommendedMovies(recommendedResponse.data.results);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <Navbar />
      {item ? (
        <>
          <section className="max-w-screen-xl mx-auto px-4 py-8">
            <div className="w-full h-screen mb-8">
              <iframe
                src={
                  isMovie
                    ? `https://vidsrc.to/embed/movie/${id}`
                    : `https://vidsrc.to/embed/tv/${id}`
                }
                title="Embedded Video"
                className="w-full h-[90%] rounded-lg shadow-md"
                allowFullScreen
              ></iframe>
            </div>

            <div className="flex flex-wrap gap-12">
              {/* Left side image */}
              <div className="h-auto mx-auto w-1/3">
                <img
                  src={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
                  alt={item.original_title || item.name}
                  className="rounded-lg shadow-md mb-4 w-full h-auto"
                />
              </div>

              {/* Right side content */}
              <div className="flex flex-col my-auto w-2/3">
                <h1 className="font-Kanit text-Fontcolor text-3xl font-bold mb-2">
                  {item.original_title || item.name}
                </h1>
                <p className="text-gray-600 mb-4">
                  Release Year: {item.release_date || item.first_air_date}
                </p>
                <p className="font-Kanit text-Fontcolor text-lg mb-4">
                  {item.overview}
                </p>
                <span className="text-lg text-Fontcolor">
                  {item.genres && item.genres.length > 0 && (
                    <p>
                      Genres:{" "}
                      {item.genres.map((genre) => genre.name).join(", ")}
                    </p>
                  )}
                </span>
              </div>
            </div>
          </section>
        </>
      ) : (
        <h3 className="text-center text-2xl">404: Not Found</h3>
      )}
       <footer className="mt-auto py-4 text-center text-gray-400">
        <p>© 2025 Burnflix</p>
      </footer>
    </>
  );
};

export default Detailpage;
