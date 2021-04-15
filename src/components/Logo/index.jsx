import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import lottie from 'lottie-web'
import styled from 'styled-components'

import animationData from './LogoLottie-Dark.json'
import { device } from '../../lib/constants/devices'

import { deSelectResearcher } from '../../redux/actions/auth.actions'
import { clearVisitorData } from '../../redux/actions/visitor.actions'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const TitleText = styled.h3`
  color: white;
  margin-bottom: 0;
  

  @media only screen and ${device.tablet} {
    display: none;
  }
`

const SubText = styled.p`
  color: white;
  font-size: 0.75em;
  margin-top: 0;

  @media only screen and ${device.tablet} {
    display: none;
  }
`

const LottieContainer = styled.div`
  width: 150px;
  height: 150px;

  @media only screen and ${device.tablet} {
    width: 125px;
    height: 125px;
  }
`

const Logo = ({ text = true, activeId, home = false }) => {
  const dispatch = useDispatch()

  const removeVisitorData = () => dispatch(clearVisitorData())
  const removeSelectedId = () => dispatch(deSelectResearcher())

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector('.lottie'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData
    })
  }, [])
    

  return (
    <Container onClick={() => { removeVisitorData(); removeSelectedId(); }}>
      <LottieContainer className='lottie' />
      {text && <div>
        <div style={{display: 'flex'}}><TitleText>{'O N L I N E'}</TitleText><TitleText style={{marginLeft: '15px'}}>{'L A B O R A T O R Y'}</TitleText></div>
        {!home && <div style={{display: 'flex'}}><SubText>Currently viewing - {activeId}</SubText></div>}
      </div>}
    </Container>
  )
}

export default Logo