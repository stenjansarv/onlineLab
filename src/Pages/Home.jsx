import React from "react"
import "./Home.css"

import Shark from '../assets/Shark.png'

// Components
import NavigationBar from '../components/NavigationBar'
import Image from '../components/Image'
import HeaderText from '../components/HeaderText'

const Home = props => {
  return (
    <div className="Home">
      <NavigationBar />
      <main>
        <div className="firstContainer">

          <HeaderText text='Research Club.' />
          <Image src={Shark} width='500px' />
        </div>
      </main>
    </div>
  )
}

export default Home
