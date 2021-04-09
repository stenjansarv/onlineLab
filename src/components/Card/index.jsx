import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  background: #C4C3E9; //lightmode - EAF2EF
  margin: 20px;
  padding: 1% 2%;
  transition: 0.3s;
  border-radius: 10px;

  &:hover {
    box-shadow: 3px 3px 40px 5px #5995ED; /* outer coral */
    background-color: #5995ED;
  }
`

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
`

const LinkToPublication = styled.a`
  width: 50%;
  padding: 1% 0 1% 0;
  align-self: center;

  color: white;
  background-color: rgba(252, 122, 87, 1);

  &:hover {
    color: white;
  }
`

const SmallContainer = styled.a`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 200px;
  height: 200px;
  background: #C4C3E9; //lightmode - EAF2EF
  margin: 20px;
  padding: 2px;
  transition: 0.3s;
  border-radius: 10px;

  overflow: hidden;

  &:hover {
    box-shadow: 3px 3px 40px 5px #5995ED; /* outer coral */
    background-color: #5995ED;
  }
`

const Card = ({title, subtitle, year, link, journal, smallMode = false}) => {

  if (smallMode) {
    return (
      <SmallContainer href={link}>
        <p style={{color: 'black'}}>{title}</p>
      </SmallContainer>
    )
  }

  return (
    <Container>
      <div style={{ textAlign: 'left' }}>
        <h3>{title}</h3>
        { subtitle && <p>{subtitle}</p> }
        <p>Journal: {journal}</p>
      </div>
      <Divider />
      <p style={{marginTop: '3%'}}>{year}</p>
      <LinkToPublication href={link}>Link to Publication</LinkToPublication>
    </Container>
  )
}

export default Card
