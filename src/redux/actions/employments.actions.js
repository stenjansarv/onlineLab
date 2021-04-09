import { waitingState } from '../../lib/action-helpers'
import fetch from 'node-fetch'

export const fetchEmployments = (publisherId) => async dispatch => {
  const waitingKey = 'EMPLOYMENTS'
  try {
    dispatch(waitingState(waitingKey, true))
    const response = await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/employments/all`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    const payload = await response.json()

    return dispatch({
      type: 'EMPLOYMENTS_LIST',
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

export const uploadEmployments = (publisherId) => async dispatch => {
  const waitingKey = 'UPLOADING_EMPLOYMENTS'
  try {
    dispatch(waitingState(waitingKey, true))
    const response = await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/employments`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    })

    const payload = await response.json()

    return dispatch({
      type: 'EMPLOYMENTS_LIST',
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

export const updateEmployment = (publisherId, employmentId, body) => async dispatch => {
  const waitingKey = 'UPDATING_EMPLOYMENT'
  try {
    dispatch(waitingState(waitingKey, true))
    await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/employments/${employmentId}`, {
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

export const deleteEmployment = (publisherId, employmentId) => async dispatch => {
  const waitingKey = 'DELETING_EMPLOYMENT'
  try {
    dispatch(waitingState(waitingKey, true))
    await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/employments/${employmentId}`, {
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

export const unloadEmployments = (publisherId) => async dispatch => {
  const waitingKey = 'UNLOADING_EMPLOYMENTS'
  try {
    dispatch(waitingState(waitingKey, true))
    await fetch(`https://fcyr6ir38i.execute-api.eu-west-2.amazonaws.com/dev/${publisherId}/employments`, {
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
