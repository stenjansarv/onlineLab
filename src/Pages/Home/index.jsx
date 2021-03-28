import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Timeline } from 'react-twitter-widgets'
import { Select, Form, Button, Input } from 'antd'
import ReactFullpage from '@fullpage/react-fullpage';
import classnames from 'classnames'

import './Home.css'
 
import Shark from '../../assets/Shark.png'
import Jellyfish from '../../assets/Jellyfish.png'

// Components
import NavigationBar from '../../components/NavigationBar'
import Image from '../../components/Image'
import HeaderText from '../../components/HeaderText'

import { selectResearcher } from '../../redux/actions/auth.actions'
import { COLORS } from '../../lib/constants/colors'

const Home = props => {
  const dispatch = useDispatch()
  const history = useHistory()

  const selectedResearcher = useSelector(state => state.auth.selectedId)
  
  const pickResearcher = (orcidId) => dispatch(selectResearcher(orcidId))

  return (
    <ReactFullpage
    style={{overscrollBehaviorY: 'none'}}
      paddingTop='3%'
      paddingBottom='7%'
      scrollingSpeed = {1000} /* Options here */
      autoScrolling={false}
      scrollOverflow={false}
      render={({ state, fullpageApi }) => {
        return (
          <div>
          <ReactFullpage.Wrapper>
          <div className='home-1 section'>
            <NavigationBar />
              <main>
                {/* <Timeline
                  dataSource={{
                    sourceType: 'profile',
                    screenName: 'duarteoceans'
                  }}
                  options={{
                    height: '400'
                  }}
                /> */}

                <div className='firstContainer'>
                  <div style={{paddingBottom: '15%'}}>
                    <h1 className='water-text'>A new way of looking at <span className='special' style={{color: COLORS.SECONDARY_300}}>research</span></h1>
                  </div>
                  <div className='searchBarContainer'>
                    <Input className='searchBar' placeholder='Search researchers by ORCID ID...' onPressEnter={async (e) => {
                      await pickResearcher(e.target.value)
              
                      history.push(`/${e.target.value}/about`)
                    }} />
                  </div>
                </div>
                <div className="lastContainer">
                  {/* <HeaderText text='Research Club.' /> */}
                  {/* <Image src={Jellyfish} width='500px' hover={true}/> */}
                </div>
              </main>
            </div>
            <div className='home-2 section'>
              <main>
              <div className="firstContainer">
                </div>
                <div className="lastContainer">
                  <Image src={Jellyfish} width='500px' hover={true}/>
                </div>
              </main>
            </div>
          </ReactFullpage.Wrapper>
          </div>
        )
      }}
    />
  )
}

export default Home
