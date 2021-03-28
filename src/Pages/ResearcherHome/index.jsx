import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { get } from 'lodash'

// Components
import NavigationBar from '../../components/NavigationBar'
import LoadingScreen from '../../components/Loading'

// Actions
import { selectResearcher } from '../../redux/actions/auth.actions'
import ResearcherHomeGrid from './ResearcherHomeGrid'
import Card from '../../components/Card'

// Styles
const Container = styled.div`
  background: rgb(0,3,22);
  display: flex;
  flex-direction: column;
  height: 100vh;
`
const Content = styled.div`
  align-items: center;
`

const ResearcherHome = () => {
  const dispatch = useDispatch()

  const { orcidId } = useParams()

  const user = useSelector(state => state.user.details)
  const isUserLoading = useSelector(state => get(state.waiting.list, 'AUTHENTICATING'))

  const setResearcher = (orcidId) => dispatch(selectResearcher(orcidId))

  useEffect(() => {
    setResearcher(orcidId)
  }, [])

  if (isUserLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <Container>
      <NavigationBar />
      <Content>
        <ResearcherHomeGrid columns={10} isResizable={false} dashboard={user.dashboard} />
      </Content>
    </Container>
  )
}

export default ResearcherHome
