import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const Detailpage = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const { id } = useParams();
  const [data, setData] = useState("");
  const detailPgApi = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

  useEffect(() => {
    fetchDetailPage();
  }, []);

  const fetchDetailPage = async () => {
    try {
      const response = await axios.get(`${detailPgApi}`);
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto ">
      <div className="w-full h-screen">
        <iframe
          src={`https://vidsrc.to/embed/movie/${id}`}
          title="Embedded Video"
          className="w-full h-[90%] rounded-lg shadow-md"
          allowFullScreen
        ></iframe>
      </div>
    </div>
      <div className="max-w-screen-xl flex mx-auto px-4 py-8 flex-1 flex-wrap">
      <div className="flex mx-auto gap-12 flex-col lg:flex-row">
        <div className="h-auto mx-auto">
        <img
          src={`https://image.tmdb.org/t/p/w1280${data.poster_path
          }`}
          alt={data.original_title}   
          className="rounded-lg shadow-md mb-4"
        />
        </div>
       
        <div className="flex-col my-auto">
          <h1 className="font-Kanit text-Fontcolor text-3xl font-bold mb-2">{data.original_title}</h1>
          <p className="text-gray-600 mb-4">
            Release Year: {data.release_date}{" "}
          </p>
          <p className="font-Kanit text-Fontcolor text-lg mb-4">{data.overview}</p>
          <span className="text-lg text-Fontcolor">
          {data.genres && data.genres.length > 0 && (
                <p>Genres: {data.genres.map(genre => genre.name).join(', ')}</p>
              )}
          </span>
        </div>
      </div>
    </div>
    </>
  );
};

export default Detailpage;
