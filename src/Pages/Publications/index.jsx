import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { get } from 'lodash'
import moment from 'moment'
import { Select, Form, Button } from 'antd'

// Components
import NavigationBar from '../../components/NavigationBar'
import Card from '../../components/Card'
import SearchBar from '../../components/SearchBar'

import { fetchPublications, queryPublications } from '../../redux/actions/publications.actions'
import { selectResearcher } from '../../redux/actions/auth.actions'
import LoadingScreen from '../../components/Loading'

const Container = styled.div`
  background: radial-gradient(farthest-side ellipse at 10% 0,#333867 20%,#17193b);
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  align-items: center;
`

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`

const Publications = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const { orcidId } = useParams()

  // MapStateToProps
  const publications = useSelector(state => state.publications.list)
  const isLoadingPublications = useSelector(state => get(state.waiting.list, 'PUBLICATIONS', true))

  // Actions
  const loadPublications = (publisherId) => dispatch(fetchPublications(publisherId))
  const loadQueriedPublications = (publisherId, queryTerms) => dispatch(queryPublications(publisherId, queryTerms))
  const setResearcher = (orcidId) => dispatch(selectResearcher(orcidId))

  const [query, setQuery] = useState([])

  useEffect(() => {
    loadPublications(orcidId)
    setResearcher(orcidId)
  }, [])

  if (isLoadingPublications) {
    return (
      <LoadingScreen />
    )
  }
  
  const updateQueryTerms = (terms) => {
    form.setFieldsValue({ query: terms })
  }

  const onSearch = () => {
    // loadQueriedPublications('0000-0001-6925-3805', query) // Enable this once querying by keywords is active again
  }

  return (
    <Container>
      <NavigationBar />
      <Content>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '3%', backgorundColor: 'red'}}>
          <SearchBar onSearch={onSearch} query={query} setQuery={setQuery}/>
        </div>
        {/* <Form form={form} name='search' onFinish={onFinish} initialValues={{ query: form.getFieldsValue(true)['query'] }}>
          <Form.Item name='query'>
            <Select style={{height: '1%', width: '35%'}} dropdownStyle={{display: 'none'}} autoFocus mode='tags' placeholder='Search for publications...' onChange={updateQueryTerms}/>   
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoadingPublications}>
              Submit
            </Button>
          </Form.Item>
        </Form> */}
        <h1 style={{color: 'white'}}>{publications.length} publications found</h1>
        <Cards>
          {publications.map((publication, key) => {
            const title = publication.title
            const subtitle = publication.subtitle
            const year = moment(publication.publication_date).format("DD MMM YYYY")
            const link = publication.url
            const type = publication.type
            const journal = publication.journal_title

            return <Card key={key} title={title} subtitle={subtitle} journal={journal} year={year} link={link} type={type}/>
          })}
        </Cards>
      </Content>
    </Container>
  )
}

export default Publications
