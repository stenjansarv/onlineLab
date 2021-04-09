import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { useHistory } from 'react-router-dom'

import { COLORS } from '../../../lib/constants/colors'

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

  background-image: url('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png');

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

  // Map props to State
  const userOrcidId = useSelector(state => state.user.details.orcidID)

  return (
    <IconContext.Provider value={{ color: '#43449B' }}>
      <div className='navbar'>
        <BackToWebsiteButton onClick={() => history.push(`/${userOrcidId}/publications`)}>Go back to the Lab</BackToWebsiteButton>
        <ProfileImage />
      </div>
    </IconContext.Provider>
  )
}

export default VerticalNavBar
