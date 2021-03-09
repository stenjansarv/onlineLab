import React from 'react'

import video from '../assets/video-1.mp4'

import style from './SignOut.css'

const SignOut = () => {
  return (
    <div className='container'>
      <video muted autoPlay loop id="video">
        <source src={video} type="video/mp4"/>
      </video>
    </div>
  )
}

export default SignOut
