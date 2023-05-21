import React, { useEffect } from 'react'
import './HomePage.css'
import Slider from '../../components/Slider/Slider'

function HomePage({apiKey, baseUrl}) {
    useEffect(()=>{
      axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`)

    }, [])
  return (
    <div className='homepage-container'>
        <Slider apiKey={apiKey} baseUrl={baseUrl} />
    </div>
  )
}

export default HomePage