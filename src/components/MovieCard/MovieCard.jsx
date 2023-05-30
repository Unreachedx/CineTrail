import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "./MovieCard.css";

export default function MovieCard({
  movie,
  width,
  height,
  radius,
  cardStyle,
  imgUrl,
  movieId,
}) 

{
  const imageBaseUrl = import.meta.env.VITE_IMAGE_URL;
  const imageStyle = {
    backgroundImage: `url(${imageBaseUrl}/${imgUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width,
    height,
    position: "relative",
    borderRadius: radius,
    boxShadow:
      cardStyle === "popular-card"
        ? "rgba(118, 118, 118, 0.75) 0px 0px 10px 0px"
        : null,
  };

  const hyperRef = `/movieDetails/${movie.id}`;
  return (
    <Link to={hyperRef} className={cardStyle}>
      <div style={imageStyle}>
        <div className="movie-info-top">
          <StarRatings
            rating={movie?.vote_average / 2}
            starRatedColor="red"
            numberOfStars={5}
            starDimension="15px"
            starSpacing="1px"
          />
        </div>
        <div className="movie-info-bottom">
          <p>{movie?.title}</p>
          <p>Rating:{movie?.vote_average / 2} </p>
        </div>
      </div>
      {cardStyle === "top-rated-card" ? <p>{movie?.title}</p> : null}
    </Link>
  );
}