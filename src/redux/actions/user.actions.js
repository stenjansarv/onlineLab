import { waitingState } from '../../lib/action-helpers'
import fetch from 'node-fetch'

export const updateUser = (userId, body) => async dispatch => {
  try {
    dispatch(waitingState('UPDATING_USER', true))

    const response = await fetch(`https://4ad7v0upre.execute-api.eu-west-2.amazonaws.com/dev/user/${userId}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const payload = await response.json()
    
    if (payload.errors === 'error') {
      return dispatch({
        type: 'AUTHENTICATION_FAILURE',
        payload: payload.message
      })
    }

    return dispatch({ type: 'USER', payload })
  } catch (error) {
    return dispatch({
      type: 'USER_UPDATE_FAILURE',
      payload: error
    })
  } finally {
    dispatch(waitingState('UPDATING_USER', false))
  }
}

export const logUserOut = () => async dispatch => {
  try {
    dispatch(waitingState('LOGGING_USER_OUT', true))

    return dispatch({ type: 'USER_LOGOUT' })
  } catch (error) {
    return dispatch({
      type: 'LOGGING_USER_OUT_FAILURE',
      payload: error
    })
  } finally {
    dispatch(waitingState('LOGGING_USER_OUT', false))
  }
}
