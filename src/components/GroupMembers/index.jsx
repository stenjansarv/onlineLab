import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 100%;
`

const Header = styled.h1`
  color: white;
`

const MemberCard = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #C4C3E9; //lightmode - EAF2EF
  margin-top: 15px;
  padding: 5px;
  transition: 0.3s;
  border-radius: 10px;

  width: 100%;
  height: 30px;

  &:hover {
    box-shadow: 3px 3px 40px 5px #5995ED;
    background-color: #5995ED;
  }
`

const Cards = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`

const TwitterFeed = ({ team }) => {
  return (
    <Container>
      <Header>Research Team</Header>
      {(team && team.length > 1) && team.map((member, index) =>
        <Cards>
          <MemberCard href={`https://orcid.org/${member.orcidID}`}>
            <p style={{margin: 'auto', color: 'black', fontWeight: 'bolder'}}>{member.name}</p>
          </MemberCard>
        </Cards>
      )}
    </Container>
  )
}

export default TwitterFeed
