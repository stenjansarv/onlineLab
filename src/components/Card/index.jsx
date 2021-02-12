import React from "react"
import "./Card.css"
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  background: rgb(255, 255, 255, 0.3);
  margin: 20px;
  padding: 1% 2%;
  border-radius: 25px;
`

const Card = ({title, subtitle, year, link}) => {
  return (
    <Container>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <p>{year}</p>
      <a href={link}>Link to Publication</a>
    </Container>
  )
}

export default Card
