import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { useHistory } from 'react-router-dom'

import { COLORS } from '../../../lib/constants/colors'

import demoProfile from '../../../assets/DemoProfile.jpeg'

import './Navbar.css'

const ProfileImage = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid white;

  margin-right: 2rem;
  justify-self: flex-end;

  box-shadow: 0px 5px 10px 0.5px #f4f7fc;

  background-image: url(${demoProfile});

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`

const BackToWebsiteButton = styled.a`
  justifySelf: flex-end;
  margin-left: auto;
  margin-right: 2rem;
  color: ${COLORS.LIGHT_SECONDARY_200}
`


const VerticalNavBar = () => {
  const history = useHistory()

  // State
  const [sidebar, setSidebar] = useState(false)
  
  // Map props to State
  const userOrcidId = useSelector(state => state.user.details.orcidID)

  const showSidebar = () => setSidebar(!sidebar)
  

  return (
      <IconContext.Provider value={{ color: '#43449B' }}>
        <div className='navbar'>
          {/* <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> */}

          <BackToWebsiteButton onClick={() => history.push(`/${userOrcidId}/publications`)}>Go back to the Lab</BackToWebsiteButton>
          <ProfileImage />
        </div>
        {/* <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav> */}
      </IconContext.Provider>
  )
}

export default VerticalNavBar
