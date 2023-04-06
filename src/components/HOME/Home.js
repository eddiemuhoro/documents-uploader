import React, { useEffect, useState } from 'react'
import './home.css'


const Home = () => {

  return (
    <div className='main'>
    <div className="overlay"></div>
    <video src='/shopping.mp4' autoPlay loop muted  />
    <div className="content">
        <h1>Welcome</h1>
        <p>To my site.</p>
    </div>
</div>
  )
}

export default Home