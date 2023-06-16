import React, { useEffect, useState } from "react";
import "./Slider.css";
import axios from "axios";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import StarRatings from "react-star-ratings";
import Genres from "../Genres/Genres";
import Rating from "../Rating/Rating";
import MovieDetails from "../../pages/MovieDetails/MovieDetails";
import { Link } from "react-router-dom";

function Slider({ apiKey, baseUrl }) {
  const baseImageUrl = import.meta.env.VITE_IMAGE_URL;
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [movieRatings, setMovieRatings] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
      .then(res => {
      setUpcomingMovies(res.data.results) 
      const ratings = res.data.results.map(movie => movie.vote_average / 2)
      setMovieRatings(ratings)})
      .catch(err => console.log(err))
  }, []);

  const sliderStyle = {
    backgroundImage: `url("${baseImageUrl}${upcomingMovies[index]?.backdrop_path}")`,
    height: "60vh",
    backgroundSize:"cover",
    position:"relative",

  };

  const handleRight = () => {
    setIndex(index+1);
    if(index === upcomingMovies.length-1) {
        setIndex(0);
    }
  }

  const handleLeft = () => {
    setIndex(index-1);
    if(index === 0) {
        setIndex(upcomingMovies.length-1);
    }
  }

  return (<div style={sliderStyle}>
    <MdKeyboardArrowRight onClick={handleRight} className="right-arrow"/>
    <MdKeyboardArrowLeft onClick={handleLeft} className="left-arrow"/>
    <div className="slider-info">
    <h1>{upcomingMovies[index]?.title}</h1>
    <p className="slider-description">{upcomingMovies[index]?.overview.slice(0,130)}...</p>
    <p>Release Date: {upcomingMovies[index]?.release_date}</p>
    <Genres 
    baseUrl={baseUrl} 
    apiKey={apiKey} 
    genreIds={upcomingMovies[index]?.genre_ids}
    />
    <Rating movieRating={movieRatings[index]}/>
    <Link to={`/moviedetails/${upcomingMovies[index]?.id}`} className="see-details">See Details</Link>
    {/* {upcomingMovies[index] && (
              <StarRatings
                rating={upcomingMovies[index]?.vote_average / 2}
                starRatedColor="red"
                numberOfStars={5}
                starDimension="15px"
                starSpacing="1px"
              />
            )} */}
    </div>
  </div>)

}

export default Slider;
