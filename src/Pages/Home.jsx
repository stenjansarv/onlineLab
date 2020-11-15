import React from "react"
import "./Home.css"

import Shark from '../assets/Shark.png'
import Jellyfish from '../assets/Jellyfish.png'

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
        <div className="lastContainer">
          <HeaderText text='Research Club.' />
          <Image src={Jellyfish} width='500px' />
        </div>
      </main>
    </div>
  )
}

export default Home
