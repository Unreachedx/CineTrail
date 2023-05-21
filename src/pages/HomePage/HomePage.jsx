import React, { useEffect } from 'react'
import './HomePage.css'
import Slider from '../../components/Slider/Slider'
import axios from 'axios'

function HomePage({apiKey, baseUrl}) {
    useEffect(()=>{
    axios
    .get(`${baseUrl}/movie/popular?api_key=${apiKey}`)
    .then((res) => console.log(res.data.results))
    .catch((err) => console.log(err));
    axios
    .get(`${baseUrl}/movie/top_rated?api_key=${apiKey}`)
    .then((res) => console.log(res.data.results))
    .catch((err) => console.log(err));
    }, [])
    
  return (
    <div className='homepage-container'>
        <Slider apiKey={apiKey} baseUrl={baseUrl} />
    </div>
  )
}

export default HomePage