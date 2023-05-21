import React, { useEffect, useState } from "react";
import "./Slider.css";
import axios from "axios";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";

function Slider({ apiKey, baseUrl }) {
  const baseImageUrl = "https://image.tmdb.org/t/p/original"
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)
      .then((res) => setUpcomingMovies(res.data.results))
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
    </div>
  </div>)

}

export default Slider;
