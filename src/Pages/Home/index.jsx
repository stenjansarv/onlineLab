import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Input } from 'antd'

import './Home.css'

// Components
import NavigationBar from '../../components/NavigationBar'

import { selectResearcher } from '../../redux/actions/auth.actions'
import { COLORS } from '../../lib/constants/colors'

const Home = props => {
  const dispatch = useDispatch()
  const history = useHistory()

  const pickResearcher = (orcidId) => dispatch(selectResearcher(orcidId))

  const root = useSelector(state => state)

  console.log(root)
  return (
    <div className='home-1'>
      <NavigationBar />
      <main>
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
        <div className="lastContainer"></div>
      </main>
    </div>
  )
}

export default Home
