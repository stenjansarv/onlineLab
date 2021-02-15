import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import fetch from 'node-fetch'

// Components
import NavigationBar from '../components/NavigationBar'
import Card from '../components/Card'

// const publications = []
const { FETCH_ALL_PUBLICATIONS_URI, PUBLICATIONS_API_KEY } = process.env

const Container = styled.div`
  background: rgb(0,3,22);
  display: flex;
  flex-direction: column;
`

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Publications = props => {
  const [publications, setPublications] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const response = await fetch(`https://${FETCH_ALL_PUBLICATIONS_URI}/0000-0001-6925-3805/publications/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': PUBLICATIONS_API_KEY,
      }
    })

    console.log(response)
    // const body = await response.json()

    // setPublications(body.group)
  }

  return (
    <Container>
      <NavigationBar />
      <Cards>
          {publications.map((publication, key) => {
            const title = publication['work-summary'][0].title.title.value
            const subtitle = publication['work-summary'][0].title.subtitle
            const year = publication['work-summary'][0]['publication-date'].year.value
            const link = publication['work-summary'][0].url.value
            const type = publication['work-summary'][0].type

            return <Card key={key} title={title} subtitle={subtitle} year={year} link={link} type={type}/>
          })}
      </Cards>
    </Container>
  )
}

export default Publications
