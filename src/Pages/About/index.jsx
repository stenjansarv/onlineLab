import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import { get, isNil } from 'lodash'

import { ExperimentOutlined, BankOutlined } from '@ant-design/icons'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

// Components
import NavigationBar from '../../components/NavigationBar'
import LoadingScreen from '../../components/Loading'

// Actions
import { fetchEmployments } from '../../redux/actions/employments.actions'
import { fetchEducations } from '../../redux/actions/educations.actions'
import { selectResearcher } from '../../redux/actions/auth.actions'
import { getVisitorUser } from '../../redux/actions/visitor.actions'

// Styles
const Container = styled.div`
  // background: rgb(0,3,22);
  background: radial-gradient(farthest-side ellipse at 10% 0,#333867 20%,#17193b);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
`
const Content = styled.div`
  align-items: center;
`

const About = () => {
  const dispatch = useDispatch()

  const { orcidId } = useParams()

  // MapStateToProps
  const selectedId = useSelector(state => state.auth.selectedId)
  const employments = useSelector(state => state.employments.list)
  const educations = useSelector(state => state.educations.list)
  const user = useSelector(state => state.user.details)
  const visitor = useSelector(state => state.visitor.details)
  const isLoadingEmployments = useSelector(state => get(state.waiting.list, 'EMPLOYMENTS', true))
  const isLoadingEducations = useSelector(state => get(state.waiting.list, 'EDUCATIONS', true))
  
  // Actions
  const loadEmployments = (publisherId) => dispatch(fetchEmployments(publisherId))
  const loadEducations = (publisherId) => dispatch(fetchEducations(publisherId))
  const setResearcher = (orcidId) => dispatch(selectResearcher(orcidId))
  const setVisitorUser = (orcidId) => dispatch(getVisitorUser(orcidId))

  useEffect(() => {
    loadEmployments(orcidId)
    loadEducations(orcidId)
    setResearcher(orcidId)
    setVisitorUser(orcidId)
  }, [])

  if (isLoadingEmployments || isLoadingEducations) {
    return <LoadingScreen />
  }
  
  console.log(visitor)
  return (
    <Container>
      <NavigationBar />
      <Content>
        {((user.fullName && isNil(selectedId)) || (user.orcidID === selectedId) || visitor.name) && <h1 style={{color: 'white'}}>About {user.fullName || visitor.name}</h1>}
        {((user.description && isNil(selectedId)) || (user.orcidID === selectedId) || visitor.description) && <p style={{color: 'white', marginTop: '20px', marginBottom: '100px'}}>{user.description || visitor.description}</p>}
        {employments.concat(educations).length > 0 ? <h1 style={{color: 'white'}}>Education & Employment History</h1> : null}
        {employments.concat(educations).length > 0 ? <VerticalTimeline>
        {employments.concat(educations).sort((a, b) => ((a.start_date ? a.start_date : a.end_date) > (b.start_date ? b.start_date : b.end_date)) ? 1 : -1).map((career, key) => {
          return (<VerticalTimelineElement
            contentStyle={{backgroundColor: '#C4C3E9', color: '#fff'}}
            contentArrowStyle={{borderRight: '7px solid #C4C3E9'}}
            key={key}
            iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff', display: 'flex'}}
            icon={career.education_id ? <ExperimentOutlined style={{margin: 'auto', marginBottom: '30%'}}/> : <BankOutlined style={{margin: 'auto', marginBottom: '30%'}} />}
          >
            <h4 style={{textAlign: key % 2 === 0 ? 'left' : 'right', fontSize: '20px'}}>{career.start_date ? moment(career.start_date).format("DD MMM YYYY") : moment(career.end_date).format("DD MMM YYYY")}</h4>
            <h3 className="vertical-timeline-element-title">{career.role_title}</h3>
            <h4 className="vertical-timeline-element-subtitle">{career.organization_name} ({career.organization_address})</h4>
          </VerticalTimelineElement>)})}
        </VerticalTimeline> : <h1 style={{color: 'white'}}>This researcher does not have any education or employment history shared publicly</h1>}
      </Content>
    </Container>
  )
}

export default About
