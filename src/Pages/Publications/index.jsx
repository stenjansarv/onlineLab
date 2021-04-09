import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { get } from 'lodash'
import moment from 'moment'
import { Switch } from 'antd'

// Components
import NavigationBar from '../../components/NavigationBar'
import Card from '../../components/Card'
import SearchBar from '../../components/SearchBar'

import { fetchPublications, queryPublications } from '../../redux/actions/publications.actions'
import { selectResearcher } from '../../redux/actions/auth.actions'
import { getVisitorUser } from '../../redux/actions/visitor.actions'
import LoadingScreen from '../../components/Loading'

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

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`

const Publications = () => {
  const dispatch = useDispatch()

  const { orcidId } = useParams()

  // MapStateToProps
  const publications = useSelector(state => state.publications.list)
  const isImporting = useSelector(state => state.visitor.details.importing)
  const isLoadingPublications = useSelector(state => get(state.waiting.list, 'PUBLICATIONS', true))

  // Actions
  const loadPublications = (publisherId) => dispatch(fetchPublications(publisherId))
  const loadQueriedPublications = (publisherId, queryTerms) => dispatch(queryPublications(publisherId, queryTerms))
  const setResearcher = (orcidId) => dispatch(selectResearcher(orcidId))
  const fetchVisitor = (orcidId) => dispatch(getVisitorUser(orcidId))

  const [query, setQuery] = useState([])
  const [smallMode, setSmallMode] = useState(false)

  useEffect(() => {
    loadPublications(orcidId)
    setResearcher(orcidId)
    fetchVisitor(orcidId)
  }, [])

  if (isLoadingPublications) {
    return (
      <LoadingScreen />
    )
  }

  const onSearch = () => {
    loadQueriedPublications(orcidId, query) // Enable this once querying by keywords is active again
  }

  return (
    <Container>
      <NavigationBar />
      <Content>
        {isImporting && <div style={{display: 'flex', justifyContent: 'center', marginBottom: '3%'}}>
          <SearchBar onSearch={onSearch} query={query} setQuery={setQuery} disabled={!isImporting}/>
        </div>}
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <h1 style={{color: 'white', marginLeft: 'auto'}}>{publications.length} publications found</h1>
          <Switch style={{marginLeft: 'auto', marginRight: '2%'}} large checkedChildren="Small Mode" unCheckedChildren="Large Mode" onChange={() => setSmallMode(!smallMode)} defaultChecked={smallMode} />
        </div>
        {publications.length > 0 && <Cards>
          {publications.map((publication, key) => {
            const title = publication.title
            const subtitle = publication.subtitle
            const year = moment(publication.publication_date).format("DD MMM YYYY")
            const link = publication.url
            const type = publication.type
            const journal = publication.journal_title

            return <Card key={key} title={title} subtitle={subtitle} journal={journal} year={year} link={link} type={type} smallMode={smallMode}/>
          })}
        </Cards>}
      </Content>
    </Container>
  )
}

export default Publications
