import React from 'react'
import styled from 'styled-components'

import AuthModalImage from '../../assets/AuthModalSharks.jpg'
import Shark from '../../assets/Shark.png'

import Image from '../Image'

import style from './index.css'

const Container = styled.div`
  display: flex;
  margin-top: 2%;
  width: 60%;
  height: 85%;
  border: 2px solid red;
  align-items: center;
  justify-content: center;
`

const Modal = styled.div`
  display: flex;
  width: 80%;
  height: 90%;
  border: 2px solid white;
  // flex-direction: column;
  // width: 600px;
  // background: rgb(255, 255, 255, 0.3);
  // margin: 20px;
  // padding: 1% 2%;
  // border-radius: 25px;
`

const LeftSide = styled.div`
  background: url(${AuthModalImage});

  /* background: rgb(0,3,22); */
  // background: linear-gradient(0deg, rgba(0,3,22,1) 0%, rgba(36,56,104,1) 100%);

  /* width: 100vw; */
  /* height: 6680px; */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  height: 100%;
  width: 40%;
`

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  background-color: yellow;
  height: 100%;
  width: 100%;
`



const AuthenticationModal = ({title, subtitle, year, link, journal, children}) => {
  return (
    <section>
      <div className='container'>
        <div className="left">

        </div>
        <div className="right">
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </section>
    // <Container>
    //   <Modal>
    //     <LeftSide />
    //     <RightSide />
    //     <Image style={{marginLeft: '-400px'}} src={Shark} width='500px'/>
    //   </Modal>
    // </Container>
  )
}

export default AuthenticationModal
