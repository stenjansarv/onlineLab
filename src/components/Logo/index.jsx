import React, { useEffect } from 'react'
import lottie from 'lottie-web'

import animationData from './LogoLottie-Dark.json'

const Logo = ({ text = true }) => {

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector('.lottie'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData
    })
  }, [])
    

  return (
    <div style={{display: 'flex', alignItems: 'center'}} >
      <div style={{width: '150px', height: '150px'}} className="lottie" />
      {text && <h3 style={{color: 'white'}}>{'O N L I N E L A B O R A T O R Y'}</h3>}
    </div>
  );
}

export default Logo