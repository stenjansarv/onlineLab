import fetch from 'node-fetch'
import { waitingState } from '../../lib/action-helpers'

export const getVisitorUser = (userId) => async dispatch => {
  try {
    dispatch(waitingState('FETCHING_VIEWING_USER', true))

    const response = await fetch(`https://4ad7v0upre.execute-api.eu-west-2.amazonaws.com/dev/user/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    const unfilteredPayload = await response.json()

    const payload = {
      twitterHandle: unfilteredPayload.twitterHandle,
      dashboard: unfilteredPayload.dashboard,
      name: unfilteredPayload.fullName,
      importing: unfilteredPayload.importing,
      email: unfilteredPayload.email,
      groupMembers: unfilteredPayload.group.enabled && unfilteredPayload.group.groupMembers
    }

    console.log(payload)

    return dispatch({ type: 'VIEWING_USER', payload })
  } catch (error) {
    return dispatch({
      type: 'FETCHING_VIEWING_USER_FAILURE',
      payload: error
    })
  } finally {
    dispatch(waitingState('FETCHING_VIEWING_USER', false))
  }
}

export const getTwitterFeed = (twitterHandle) => async dispatch => {
  if (!twitterHandle) return
  try {
    dispatch(waitingState('FETCHING_USER_TWITTER_FEED', true))

    const response = await fetch(`https://4ad7v0upre.execute-api.eu-west-2.amazonaws.com/dev/twitterfeed/${twitterHandle}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    const payload = await response.json()

    return dispatch({ type: 'TWITTER_FEED', payload })
  } catch (error) {
    return dispatch({
      type: 'FETCHING_USER_TWITTER_FEED_FAILURE',
      payload: error
    })
  } finally {
    dispatch(waitingState('FETCHING_USER_TWITTER_FEED', false))
  }
}