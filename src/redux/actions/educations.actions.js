import { waitingState } from '../../lib/action-helpers'
import fetch from 'node-fetch'

export const fetchEducations = (publisherId) => async dispatch => {
  const waitingKey = 'EDUCATIONS'
  try {
    dispatch(waitingState(waitingKey, true))
    const response = await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/educations/all`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    const payload = await response.json()

    return dispatch({
      type: 'EDUCATIONS_LIST',
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

export const uploadEducations = (publisherId) => async dispatch => {
  const waitingKey = 'UPLOADING_EMPLOYMENTS'
  try {
    dispatch(waitingState(waitingKey, true))
    const response = await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/educations`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    })

    const payload = await response.json()

    return dispatch({
      type: 'EDUCATIONS_LIST',
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

export const updateEducation = (publisherId, educationId, body) => async dispatch => {
  const waitingKey = 'UPDATING_EDUCATION'
  try {
    dispatch(waitingState(waitingKey, true))
    await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/educations/${educationId}`, {
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

export const deleteEducation = (publisherId, educationId) => async dispatch => {
  const waitingKey = 'DELETING_EDUCATION'
  try {
    dispatch(waitingState(waitingKey, true))
    await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/educations/${educationId}`, {
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

export const unloadEducations = (publisherId) => async dispatch => {
  const waitingKey = 'UNLOADING_EDUCATIONS'
  try {
    dispatch(waitingState(waitingKey, true))
    await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/educations`, {
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