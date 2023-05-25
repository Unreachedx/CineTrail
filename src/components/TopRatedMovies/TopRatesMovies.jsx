import React from "react";
import MovieCard from "../MovieCard/MovieCard";

export default function TopRatedMovies({ topRatedMovies }) {
  return (
    <div className="top-rated-container">
      <h3>Top Rated Movies</h3>
      <div className="top-rated-cards-wrapper">
        {topRatedMovies?.map((movie) => (
          <MovieCard
            key={movie?.id}
            movie={movie}
            width="200px"
            height="100px"
            radius="8px"
            cardStyle="top-rated-card"
            imgUrl={movie?.backdrop_path}
            movieId={movie?.id}
          />
        ))}
      </div>
    </div>
  );
}