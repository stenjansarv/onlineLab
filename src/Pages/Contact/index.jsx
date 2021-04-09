import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

// Components
import NavigationBar from '../../components/NavigationBar'

const Container = styled.div`
  background: radial-gradient(farthest-side ellipse at 10% 0,#333867 20%,#17193b);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
`

const Content = styled.div`
  align-items: center;
`

const Contact = () => {
  const dispatch = useDispatch()

  const { orcidId } = useParams()

  return (
    <Container>
      <NavigationBar />
      <Content>

      </Content>
    </Container>
  )
}

export default Contact
