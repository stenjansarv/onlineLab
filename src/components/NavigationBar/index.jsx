import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../Logo'

const NavigationBar = () => {

  return (
    <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '10vh', color: '#fff', paddingLeft: '5%', paddingRight: '5%'}}>
      <Logo />
      <ul style={{width: '40%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', listStyle: 'none'}}>
        <Link style={{color: 'white'}} to='/about'>
          <li>About</li>
        </Link>
        <Link style={{color: 'white'}} to='/contact'>
          <li>Contact</li>
        </Link>
        <Link style={{color: 'white'}} to='/publications'>
          <li>Publications</li>
        </Link>
        <Link style={{color: 'white'}} to='/contact'>
          <li>Contact</li>
        </Link>
      </ul>
    </nav>
  )
}

export default NavigationBar