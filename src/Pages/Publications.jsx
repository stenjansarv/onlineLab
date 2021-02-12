import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import fetch from 'node-fetch'

// Components
import NavigationBar from '../components/NavigationBar'
import Card from '../components/Card'

// const publications = []

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
    const response = await fetch('https://pub.orcid.org/v3.0/0000-0001-6925-3805/works', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const body = await response.json()

    setPublications(body.group)
  }

  const parsePublicatinos = (unparsed) => {
    let lmao = unparsed.split('Publications</strong></span></h2>').pop();
    let onlyPublicationsWithEnd = lmao.split('Resources</strong></h2>').shift();
    let onlyPublications = onlyPublicationsWithEnd.split('</div></div>').shift();
    
    let multiplePublications = onlyPublications.split('<p><span style="color: #ffffff;">')

    // Remove null field
    multiplePublications.shift()

    let tempPublications = []
    multiplePublications.forEach((item, index) => {
      const authorAndYear = /[^\d]*(\d+)./.exec(item);
      const publicationYear = authorAndYear[1];
      let authorsString = authorAndYear[0];
      // console.log(authorAndYear)

      authorsString = authorsString.substring(0, authorsString.length - 6)
      
      let authors = authorsString.split(',')
      let lastAuthors = authors[authors.length - 1].split(' and ')
      if (lastAuthors.length === 2) {
        // Remove last element that has 2 authors
        authors.pop()
        
        // Add the first author from the 2 author string
        authors.push(lastAuthors[0])
        // Add the second author from the 2 author string
        authors.push(lastAuthors[1])
      }

      // Get everything to the right of the publication year.
      const body = item.split(/(^|\\s)[^\d]*(\d+)./)[3]

      
      // Get the title out of the body
      const title = body.split('.')[0]

      const i = body.indexOf('.')

      // Get publishedAt
      let publishedAt = body.slice(i+1).split('<a')[0];
      publishedAt = publishedAt.replaceAll('<strong>', '')

      let pdfLinkBody = body.slice(i+1).split('<a')[1];
      let hrefIndex = pdfLinkBody.indexOf('href="');
      let href = pdfLinkBody.slice(hrefIndex+1).split('"')[1]

      // Remove the HTML tags from the title
      let titleWithoutHTML = title.replaceAll('<em>', '')
      titleWithoutHTML = titleWithoutHTML.replaceAll('</em>', '')
      
      tempPublications[index] = {
        authors,
        publicationYear,
        title: titleWithoutHTML,
        publishedAt,
        href
      }
    })

    setPublications(tempPublications)
  }

  console.log(publications)
  

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
