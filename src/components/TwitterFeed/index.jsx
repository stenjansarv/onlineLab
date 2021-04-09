import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Skeleton, Card, Avatar } from 'antd'
import { get } from 'lodash'

import { getTwitterFeed } from '../../redux/actions/visitor.actions'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  // overflow: hidden;

  width: 100%;
  height: 100%;
`

const Header = styled.h1`
  color: white;
`

const TweetCard = styled.div`
  display: flex;
  background: #C4C3E9; //lightmode - EAF2EF
  margin-top: 10px;
  padding: 10px;
  transition: 0.3s;
  border-radius: 10px;
`

const LeftPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 20%;
`

const RightPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`

const RightTop = styled.div`
  display: flex;
  align-text: left;
`
const RightBottom = styled.div`
  display: flex;
  align-text: left;
`

const TwitterFeed = () => {
  const dispatch = useDispatch()

  // State
  const twitterHandle = useSelector(state => state.visitor.details.twitterHandle)
  const researcherName = useSelector(state => state.visitor.details.name)
  const twitterFeed = useSelector(state => state.visitor.twitter.data)

  const isLoadingTwitter = useSelector(state => get(state.waiting.list, 'FETCHING_USER_TWITTER_FEED', true))
  
  // Actions
  const fetchTwitterFeed = (twitterHandle) => dispatch(getTwitterFeed(twitterHandle))
  
  useEffect(() => {
    if (!twitterHandle) return

    fetchTwitterFeed(twitterHandle)
  }, [twitterHandle])
  
  return (
    <Container>
      <Header>Twitter Feed</Header>
      {twitterFeed && twitterFeed.slice(0, 3).map((tweet, index) =>
        <Card key={index} style={{ width: '100%', marginTop: 16, background: 'none', border: 'none' }}>

          <Skeleton loading={isLoadingTwitter} avatar active>
            <TweetCard>
              <LeftPart>
                <Avatar style={{width: '50px', height: '50px'}} src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
              </LeftPart>
              <RightPart>
                <RightTop>
                  <p style={{fontWeight: 'bolder', textAlign: 'left'}}>{researcherName} - @{twitterHandle}</p>
                </RightTop>
                <RightBottom>
                  <p style={{textAlign: 'left'}}>{tweet.text}</p>
                </RightBottom>
              </RightPart>
            </TweetCard>
          </Skeleton>
        </Card>
      )}
    </Container>
  )
}

export default TwitterFeed
