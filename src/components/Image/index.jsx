import React from "react"
import "./Image.css"

function Image({src, width}) {
  return (
    <div className="imageContainer">
      <img src={src} style={{width}} alt="" />
    </div>
  )
}

export default Image
