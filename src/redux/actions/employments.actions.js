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