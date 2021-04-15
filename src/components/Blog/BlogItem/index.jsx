import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 49%;
  height: 49%;

  margin: 0.5px;
`

const Layer = styled.div`
  height: 100%;
  width: 100%;
  background: #C4C3E9; //lightmode - EAF2EF
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
`

const ReadMoreButton = styled.button`
  min-width: 150px;
  width: 60%;
  min-height: 40px;
  background-color: rgb(252, 122, 87);
  border: 1.5px solid rgb(252, 122, 87);
  border-radius: 7px;
  color: white;
  margin-top: 20px;

  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 3px 15px 0px rgba(252, 122, 87, 0.7);
  }
`

const BlogItem = ({ title = 'Placeholder Title', text = 'Placeholder Text', setShowPost, post }) => {

  return (
    <Container>
      <Layer>
        <h1>{title}</h1>
        <ReadMoreButton onClick={() => { setShowPost(post) }}>Read more...</ReadMoreButton>
      </Layer>
    </Container>
  )
}

export default BlogItem
