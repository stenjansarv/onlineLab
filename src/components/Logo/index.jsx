import React, { useEffect } from 'react'
import lottie from 'lottie-web'

import animationData from './OctopusLogoLottie.json'

const Logo = () => {

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector('.octopus-lottie'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData
    })
  }, [])
    

  return (
    <div style={{display: 'flex', alignItems: 'center'}} >
      <div style={{width: '150px', height: '150px'}} className="octopus-lottie" />
      <h3 style={{color: 'white'}}>Online Laboratory</h3>
    </div>
  );
}

export default Logo