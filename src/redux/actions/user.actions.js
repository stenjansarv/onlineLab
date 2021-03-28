import { waitingState } from '../../lib/action-helpers'

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

    console.log('WOT', payload)

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