import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import axios from "axios";

export default function PopularMovies({ apiKey, baseUrl }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    axios
      .get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${currentPage}`)
      .then((res) => {
        console.log(res.data.results);
        setPopularMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  return (
    <div className="popular-container">
      <h3 className="popular-title">Popular Movies</h3>
      <div className="popular-cards-wrapper">
        {popularMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            width="200px"
            height="300px"
            radius="16px"
            cardStyle="popular-card"
            imgUrl={movie?.poster_path}
            movieId={movie?.id}
          />
        ))}
      </div>
      <div className="page-numbers">
        Select Page:
        {pageNumbers.map((number) => (
          <p key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </p>
        ))}
      </div>
    </div>
  );
}