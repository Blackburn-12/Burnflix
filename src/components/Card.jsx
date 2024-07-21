import React from "react";
import "./Card.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
const Card = ({ cardData }) => {
  const navigate = useNavigate();

  const cardClick = () => {
    navigate(`/movies/${cardData.id}`);
  };
  return (
    <div
      onClick={cardClick}
      className="imdb-card max-w-sm rounded overflow-hidden shadow-lg m-2"
    >
      <img
        src={`https://image.tmdb.org/t/p/w1280${cardData.poster_path}`}
        alt={cardData.title}
        className="imdb-card-image "
      />
      <div className="imdb-card-content">
        <h2 className="imdb-card-title font-Kanit">{cardData.title}</h2>
        <div className="flex justify-start items-center gap-1">
          <img
            className="w-[15px] h-[15px]"
            src="https://freepngtransparent.com/wp-content/uploads/2023/03/Star-Png-164.png"
            alt=""
          />
          <p className="text-[#F0F0F0]">{cardData.vote_average.toFixed(1)}</p>
        </div>
        <p className="imdb-card-release-date font-Kanit">
          Release Date <br />
          {cardData.release_date}
        </p>
      </div>
    </div>
  );
};

export default Card;
