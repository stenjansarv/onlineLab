import { waitingState } from '../../lib/action-helpers'
import fetch from 'node-fetch'

export const uploadPublications = (publisherId) => async dispatch => {
  const waitingKey = 'UPLOADING_PUBLICATIONS'
  try {
    dispatch(waitingState(waitingKey, true))
    const response = await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/publications`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    })

    const payload = await response.json()

    return dispatch({
      type: 'PUBLICATIONS_LIST',
      payload
    })
  } catch (error) {
    return dispatch({
      type: 'FETCH_ERROR',
      payload: error
    })
  } finally {
    dispatch(waitingState(waitingKey, false))
  }
}

export const updatePublication = (publisherId, publicationId, body) => async dispatch => {
  const waitingKey = 'UPDATING_PUBLICATION'
  try {
    dispatch(waitingState(waitingKey, true))
    await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/publications/${publicationId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

  } catch (error) {
    return dispatch({
      type: 'FETCH_ERROR',
      payload: error
    })
  } finally {
    dispatch(waitingState(waitingKey, false))
  }
}

export const deletePublication = (publisherId, publicationId) => async dispatch => {
  const waitingKey = 'DELETING_PUBLICATION'
  try {
    dispatch(waitingState(waitingKey, true))
    await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/publications/${publicationId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return dispatch({
      type: 'FETCH_ERROR',
      payload: error
    })
  } finally {
    dispatch(waitingState(waitingKey, false))
  }
}

export const unloadPublications = (publisherId) => async dispatch => {
  const waitingKey = 'UNLOADING_PUBLICATIONS'
  try {
    dispatch(waitingState(waitingKey, true))
    await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/publications/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return dispatch({
      type: 'FETCH_ERROR',
      payload: error
    })
  } finally {
    dispatch(waitingState(waitingKey, false))
  }
}

export const fetchPublications = (publisherId) => async dispatch => {
  const waitingKey = 'PUBLICATIONS'
  try {
    dispatch(waitingState(waitingKey, true))
    const response = await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/publications/all`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    const payload = await response.json()

    return dispatch({
      type: 'PUBLICATIONS_LIST',
      payload
    })
  } catch (error) {
    return dispatch({
      type: 'FETCH_ERROR',
      payload: error
    })
  } finally {
    dispatch(waitingState(waitingKey, false))
  }
}


export const queryPublications = (publisherId, queryTerms = []) => async dispatch => {
  const query = queryTerms.join()
  const waitingKey = 'PUBLICATIONS'
  try {
    dispatch(waitingState(waitingKey, true))
    const response = await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/publications?keywords=${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.status && response.status === 204) {
      return dispatch({
        type: 'PUBLICATIONS_LIST',
        payload: []
      })
    }

    const payload = await response.json()

    return dispatch({
      type: 'PUBLICATIONS_LIST',
      payload
    })
  } catch (error) {
    return dispatch({
      type: 'FETCH_ERROR',
      payload: error
    })
  } finally {
    dispatch(waitingState(waitingKey, false))
  }
}