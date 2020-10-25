import React, { useEffect } from 'react'
import lottie from 'lottie-web'

import animationData from './NotFoundLottie.json'

function NotFound() {

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector('.notFound-lottie'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData
    })
  })

  return (
    <div>
      <div className="notFound-lottie"></div>
    </div>
  );
}

export default NotFound
