import React, { useEffect, useState } from "react";
import "./homepage.css";
import axios from "axios";
import TopRatedMovies from "../../components/TopRatedMovies/TopRatesMovies";
import PopularMovies from './../../components/PopularMovies/PopularMovies';
import Slider from './../../components/Slider/Slider';

const HomePage = ({ apiKey, baseUrl }) => {
  const [topRatedmovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    // axios
    //   .get(`${baseUrl}/movie/popular?api_key=${apiKey}`)
    //   .then((res) => console.log(res.data.results))
    //   .catch((err) => console.log(err));
    axios
      .get(`${baseUrl}/movie/top_rated?api_key=${apiKey}`)
      .then((res) => {
        setTopRatedMovies(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="homepage-container">
      <Slider apiKey={apiKey} baseUrl={baseUrl} />
      <div className="movies-wrapper">
        <PopularMovies baseUrl={baseUrl} apiKey={apiKey} />
        <TopRatedMovies topRatedMovies={topRatedmovies} />
      </div>
    </div>
  );
};

export default HomePage;