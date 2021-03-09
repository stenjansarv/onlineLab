import React from 'react'
import './Image.css'
import classnames from 'classnames'
import styled from 'styled-components'

function Image({src, width, hover = false}) {
  return (
    <div className="imageContainer">
      {hover ? <img src={src} style={{width}} className={classnames({ hover })} alt=""/> : <img src={src} style={{width}} alt="" />}
    </div>
  )
}

export default Image
