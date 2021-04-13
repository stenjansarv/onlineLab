import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Input } from 'antd'
import styled from 'styled-components'

import './Home.css'

import { device } from '../../lib/constants/devices'
import { COLORS } from '../../lib/constants/colors'

import NavigationBar from '../../components/NavigationBar'

import { selectResearcher } from '../../redux/actions/auth.actions'

const TitleText = styled.h1`
  color: lightgray;
  width: 60%;
  font-size: 5em;
  font-family: 'Montserrat', sans-serif;
  padding: 0;
  margin: 0;
  text-align: left;

  @media only screen and ${device.tablet} {
    margin-top: 30%;
    font-size: 3em;
  }
`

const BoldText = styled.span`
  color: ${COLORS.SECONDARY_300};
  font-weight: bold;
`

const SearchBar = styled(Input)`
  padding-left: 5%;
  padding-right: 5%;

  border-radius: 50px;
  font-size: x-large;

  font-family: 'Montserrat';
`

const SearchBarContainer = styled.div`
  width: 70%;
  align-self: flex-start;

  @media only screen and ${device.tablet} {
    width: 90%;
  }
`

const LeftContainer = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding-left: 20%;
  padding-top: 3%;

  @media only screen and ${device.tablet} {
    padding-left: 5%;
    padding-right: 5%;
    justify-content: center;
  }
`

const RightContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;

  @media only screen and ${device.tablet} {
    display: none;
  }
`

const Home = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const pickResearcher = (orcidId) => dispatch(selectResearcher(orcidId))

  return (
    <div className='home-1'>
      <NavigationBar home />
      <main>
        <LeftContainer>
          <div style={{paddingBottom: '15%'}}>
            <TitleText>A new way of looking at<BoldText>research</BoldText></TitleText>
          </div>
          <SearchBarContainer>
            <SearchBar placeholder='Search researchers by ORCID ID...' onPressEnter={async (e) => {
              await pickResearcher(e.target.value)
      
              history.push(`/${e.target.value}/about`)
            }} />
          </SearchBarContainer>
        </LeftContainer>
        <RightContainer />
      </main>
    </div>
  )
}

export default Home
