import React,{ useState, useEffect, useContext } from 'react'
import './MovieDetails.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { ThemeContext } from '../../contexts/ThemeContext'
import Rating from '../../components/Rating/Rating'
import Genres from '../../components/Genres/Genres'
import { MdReviews } from 'react-icons/md'

function MovieDetails({baseUrl, apiKey}) {
    const {movieid} = useParams();
    const [videoLink, setVideoLink] = useState('')
    const [movie, setMovie] = useState([])
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const [movieRating, setMovieRating] = useState(0)
    const [reviews, setReviews] = useState([])
    const [totalReviews, setTotalReviews] = useState(0)
    const [reviewNumber, setReviewNumber] = useState(3)


    useEffect(() => {  
        axios.get(`${baseUrl}/movie/${movieid}?api_key=${apiKey}`)
        .then(res=>{
          console.log(res.data)
          setMovie(res.data)
          setMovieRating((res.data.vote_average)/2) 
        })
        .catch(err=>console.log(err))


        axios.get(`${baseUrl}/movie/${movieid}/videos?api_key=${apiKey}&language=en-US`)
        .then(res=>{
          console.log(res.data)
        const youtubeLink = res.data.results.filter(item=>item.site==="YouTube" && item.type==="Trailer")
        setVideoLink(youtubeLink[0]?.key)
        })

        axios.get(`${baseUrl}/movie/${movieid}/reviews?api_key=${apiKey}`)
        .then(res=>{
          // console.log(res.data)
          setTotalReviews(res.data.total_results)
          setReviews(res.data.results)
        })
        .catch(err=>console.log(err))


  }, [movieid])




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

<div className={`movie-details-container ${!darkMode && "movie-detail container"}`}>
    <div className='title-container'>
        <h1> {movie.title} </h1>
        </div>
        <Rating movieRating={movieRating} />
        <div className="movie-info-container">
        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className='details-poster' />

        <div className="movie-info">
        <h2>{movie.tagline}</h2>
        <h4>{movie.overview}</h4>
        <h4>Status:{movie.status}</h4>
        <h4>Status:{movie.runtime}</h4>
        <h4>Status:{movie.budget}</h4>
        <Genres component="details" movieGenres={movie?.genres} baseUrl={baseUrl} apiKey={apiKey}/>
        </div>
        </div>
<div className="review-container">
     <p className='reviews-title'>Reviews</p>
     {
        reviews.slice(0,reviewNumber).map(item=>{
            return <reviews key={item.id} review={item.review} />
        })
     }
</div>

    </div>
    </div>
  )
}




export default MovieDetails
