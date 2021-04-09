import { waitingState } from '../../lib/action-helpers'

export const getBlogPosts = (userId) => async dispatch => {
  try {
    dispatch(waitingState('FETCHING_BLOG_POSTS', true))

    const response = await fetch(`https://4ad7v0upre.execute-api.eu-west-2.amazonaws.com/dev/blog/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    const payload = await response.json()

    return dispatch({ type: 'BLOG_POSTS', payload })
  } catch (error) {
    return dispatch({
      type: 'FAILED_FETCHING_BLOG_POSTS',
      payload: error
    })
  } finally {
    dispatch(waitingState('FETCHING_BLOG_POSTS', false))
  }
}

export const createNewBlogPost = (userId, body) => async dispatch => {
  try {
    dispatch(waitingState('CREATING_NEW_POST', true))

    await fetch(`https://4ad7v0upre.execute-api.eu-west-2.amazonaws.com/dev/blog/${userId}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
  } catch (error) {
    return dispatch({
      type: 'FAILED_CREATING_NEW_POST',
      payload: error
    })
  } finally {
    dispatch(waitingState('CREATING_NEW_POST', false))
  }
}

export const updateBlogPost = (userId, postId, body) => async dispatch => {
  try {
    dispatch(waitingState('UPDATING_BLOG_POSTS', true))

    await fetch(`https://4ad7v0upre.execute-api.eu-west-2.amazonaws.com/dev/blog/${userId}/update/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
  } catch (error) {
    return dispatch({
      type: 'FAILED_UPDATING_BLOG_POSTS',
      payload: error
    })
  } finally {
    dispatch(waitingState('UPDATING_BLOG_POSTS', false))
  }
}

export const deleteBlogPost = (userId, postId) => async dispatch => {
  try {
    dispatch(waitingState('DELETING_BLOG_POST', true))

    await fetch(`https://4ad7v0upre.execute-api.eu-west-2.amazonaws.com/dev/blog/${userId}/delete/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return dispatch({
      type: 'FAILED_DELETING_BLOG_POST',
      payload: error
    })
  } finally {
    dispatch(waitingState('DELETING_BLOG_POST', false))
  }
}