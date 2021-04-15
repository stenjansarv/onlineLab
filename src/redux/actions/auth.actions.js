import { waitingState } from '../../lib/action-helpers'
import { Auth } from 'aws-amplify'

export const continueSession = (email) => async dispatch => {
  try {
    dispatch(waitingState('AUTHENTICATING', true))

    const response = await fetch(`https://4ad7v0upre.execute-api.eu-west-2.amazonaws.com/dev/user?email=${email}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    const payload = await response.json()

    if (payload.errors === 'error') {
      return dispatch({
        type: 'AUTHENTICATION_FAILURE',
        payload: payload.message
      })
    }

    dispatch({ type: 'USER', payload})
    dispatch({ type: 'LOGIN_SUCCESS', payload: true })
    return dispatch({ type: 'AUTHENTICATION_SUCCESS', payload: true })
  } catch (error) {
    return dispatch({
      type: 'AUTHENTICATION_FAILURE',
      payload: error
    })
  } finally {
    dispatch(waitingState('AUTHENTICATING', false))
  }
}

export const authenticate = (email, password) => async dispatch => {
  try {
    dispatch(waitingState('AUTHENTICATING', true))
    const data = await Auth.signIn({ username: email, password })

    const response = await fetch(`https://4ad7v0upre.execute-api.eu-west-2.amazonaws.com/dev/user?email=${email}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    const payload = await response.json()

    if (payload.errors === 'error') {
      return dispatch({
        type: 'AUTHENTICATION_FAILURE',
        payload: payload.message
      })
    }

    dispatch({ type: 'USER', payload})
    dispatch({ type: 'LOGIN_SUCCESS', payload: data })
    return dispatch({ type: 'AUTHENTICATION_SUCCESS', payload: data })
  } catch (error) {
    return dispatch({
      type: 'AUTHENTICATION_FAILURE',
      payload: error
    })
  } finally {
    dispatch(waitingState('AUTHENTICATING', false))
  }
}

export const requestRegistrationCode = (email, password) => async dispatch => {
  try {
    dispatch(waitingState('REGISTER', true))
    const data = await Auth.signUp({ username: email, password, attributes: { email } })

    return { payload: data }
  } catch (error) {
    return dispatch({
      type: 'FETCH_ERROR',
      payload: error
    })
  } finally {
    dispatch(waitingState('REGISTER', false))
  }
}

export const confirmRegistrationCode = (email, code, publisherId) => async dispatch => {
  try {
    dispatch(waitingState('REGISTER', true))
    await Auth.confirmSignUp(email, code)

    const response = await fetch(`https://4ad7v0upre.execute-api.eu-west-2.amazonaws.com/dev/user/${publisherId}/register?email=${email}`, {
      method: 'POST',
      body: JSON.stringify({email}),
      headers: { 'Content-Type': 'application/json' }
    })

    const payload = await response.json()

    dispatch({ type: 'LOGIN_SUCCESS', payload })
    dispatch({ type: 'AUTHENTICATION_SUCCESS', payload })

    return dispatch({
      type: 'USER',
      payload
    })
  } catch (error) {
    return dispatch({
      type: 'FETCH_ERROR',
      payload: error
    })
  } finally {
    dispatch(waitingState('REGISTER', false))
  }
}

export const signOut = () => async dispatch => {
  try {
    dispatch(waitingState('SIGNING_OUT', true))
    await Auth.signOut()

    return dispatch({ type: 'SIGNING_OUT_SUCCESS' })
  } catch (error) {
    return dispatch({
      type: 'SIGNING_OUT_FAILURE',
      payload: error
    })
  } finally {
    dispatch(waitingState('SIGNING_OUT', false))
  }
}

export const selectResearcher = (orcidId) => async dispatch => {
  try {
    dispatch(waitingState('SELECTING_RESEARCHER', true))

    return dispatch({ type: 'RESEARCHER_SELECTED', payload: orcidId })
  } catch (error) {
    return dispatch({
      type: 'RESEARCHER_SELECTION_FAILED',
      payload: error
    })
  } finally {
    dispatch(waitingState('SELECTING_RESEARCHER', false))
  }
}

export const deSelectResearcher = () => async dispatch => {
  try {
    dispatch(waitingState('DESELECTING_RESEARCHER', true))

    return dispatch({ type: 'RESEARCHER_DESELECTED'  })
  } catch (error) {
    return dispatch({
      type: 'DESELECTING_RESEARCHER_FAILED',
      payload: error
    })
  } finally {
    dispatch(waitingState('DESELECTING_RESEARCHER', false))
  }
}
