import React,{ useState, useEffect, useContext } from 'react'
import './MovieDetails.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { ThemeContext } from '../../contexts/ThemeContext'

function MovieDetails({baseUrl, apiKey}) {
    const {movieid} = useParams();
    const [videoLink, setVideoLink] = useState('')
    const [movie, setMovie] = useState([])
    const { darkMode, setDarkMode } = useContext(ThemeContext);


    useEffect(()=>{
        axios.get(`${baseUrl}/movie/${movieid}?api_key=${apiKey}/`)
        .then(res=>{
            console.log(res.data)
            setMovie(res.data)
        .catch((err) => console.log(err));
        })

        axios.get(`${baseUrl}/movie/${movieid}/videos?api_key=${apiKey}/`)
        .then(res=>{
            console.log(res.data)
            const youtubeLink = res.data.results.filter(item => item.site==="YouTube" && item.type === "Trailer")
            setVideoLink(youtubeLink[0]?.key)
        .catch((err) => console.log(err));
        })
    })



  return (
    <div className={`movie-details-container ${!darkMode && "movie-detail container"}`}>
        {
            videoLink ? 
            <div className="trailer-container">
            <ReactPlayer className="trailer-player" url={`https://www.youtube.com/watch?v=${videoLink}`} />
                </div>
                :
        <div className="trailer-container-blank" style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize:'cover',
        backgroundPosition: 'center',

        }}> <p> No Trailer Released Yet</p>
            </div>
        }
    </div>
  )
}




export default MovieDetails