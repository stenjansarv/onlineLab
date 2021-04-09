import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { get } from 'lodash'
import styled from 'styled-components'

import BlogItem from './BlogItem'

import { getBlogPosts } from '../../redux/actions/blog.actions'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;

  overflow: hidden;

  width: 100%;
  height: 100%;
`

const CloseButton = styled.button`
  width: 20%;
  min-height: 40px;
  background-color: rgb(252, 122, 87);
  border: none;
  border-radius: 10px;
  color: white;

  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
  }
`

const Blog = () => {
  const dispatch = useDispatch()
  const { orcidId } = useParams()

  const [showPost, setShowPost] = useState(null)

  // State
  const blogPosts = useSelector(state => state.blog.posts)
  
  // Actions
  const loadBlogPosts = (publisherId) => dispatch(getBlogPosts(publisherId))
  
  useEffect(() => {
    loadBlogPosts(orcidId)
  }, [])
  
  return (
    <Container>
      {showPost ? <div style={{backgroundColor: '#C4C3E9', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '20px'}}>
        <div>
          <h1>{get(showPost, 'title')}</h1>
          <p>{get(showPost, 'post')}</p>
        </div>
        <CloseButton onClick={() => setShowPost(false)}>Close</CloseButton>
      </div> :
      <>
        {blogPosts.map(post => {
          return <BlogItem key={post.postId} title={post.title} text={post.post} setShowPost={setShowPost} post={post} />
        })}
      </>}
    </Container>
  )
}

export default Blog
