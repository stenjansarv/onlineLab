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
import { getVisitorUser } from '../../redux/actions/visitor.actions'
import ResearcherHomeGrid from './ResearcherHomeGrid'

// Styles
const Container = styled.div`
  // background: rgb(0,3,22);
  background: radial-gradient(farthest-side ellipse at 10% 0,#333867 20%,#17193b);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;

  overflow: hidden;
`

const ResearcherHome = () => {
  const dispatch = useDispatch()

  const { orcidId } = useParams()

  const user = useSelector(state => state.user.details)
  const visitor = useSelector(state => state.visitor.details)
  const isUserLoading = useSelector(state => get(state.waiting.list, 'AUTHENTICATING'))
  const isVisitorLoading = useSelector(state => get(state.waiting.list, 'FETCHING_VIEWING_USER'))

  const setResearcher = (publisherId) => dispatch(selectResearcher(publisherId))
  const fetchVisitorUser = (publisherId) => dispatch(getVisitorUser(publisherId))

  useEffect(() => {
    setResearcher(orcidId)
    fetchVisitorUser(orcidId)
  }, [])

  if (isUserLoading || isVisitorLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <Container>
      <NavigationBar />
        {visitor.dashboard ? (visitor.dashboard && <ResearcherHomeGrid columns={10} isResizable={false} dashboard={visitor.dashboard || user.dashboard} team={visitor.groupMembers}/>)
        : <div style={{height: '100%', width: '100%', margin: 'auto'}}><h1 style={{color: 'white'}}>This researcher has not yet set up their Homepage on this platform</h1></div>
        }
    </Container>
  )
}

export default ResearcherHome
