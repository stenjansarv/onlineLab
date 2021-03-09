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
    const data = await Auth.confirmSignUp(email, code)

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

// export const attachMarketplace = token => async dispatch => {
//   try {
//     dispatch(waitingState('MARKETPLACE', true))
//     await apiFetch(`/api/v1/auth/marketplace`, {
//       method: 'POST',
//       body: JSON.stringify({ token }),
//       headers: new global.Headers({ 'Content-Type': 'application/json' }),
//       credentials: 'include'
//     })
//     return dispatch({
//       type: 'MARKETPLACE_ATTACHED',
//       payload: token
//     })
//   } catch (error) {
//     return dispatch({
//       type: 'FETCH_ERROR',
//       payload: error
//     })
//   } finally {
//     dispatch(waitingState('MARKETPLACE', false))
//   }
// }

// export const logout = () => async dispatch => {
//   try {
//     dispatch(waitingState('LOGOUT', true))
//     await apiFetch(`/api/v1/auth/logout`, {
//       method: 'GET',
//       headers: new global.Headers({ 'Content-Type': 'application/json' }),
//       credentials: 'include'
//     })

//     return dispatch({
//       type: 'USER_LOGOUT'
//     })
//   } catch (error) {
//     return dispatch({
//       type: 'FETCH_ERROR',
//       payload: error
//     })
//   } finally {
//     dispatch(waitingState('LOGOUT', false))
//   }
// }

// export const forgotPassword = email => async dispatch => {
//   try {
//     dispatch(waitingState('FORGOT_PASSWORD', true))
//     const { data } = await apiFetch(`/api/v1/auth/password/forgot`, {
//       method: 'POST',
//       headers: new global.Headers({ 'Content-Type': 'application/json' }),
//       body: JSON.stringify({
//         email
//       }),
//       credentials: 'include'
//     })
//     return dispatch({
//       type: 'FORGOT_PASSWORD_SENT',
//       payload: data
//     })
//   } catch (error) {
//     return dispatch({
//       type: 'FETCH_ERROR',
//       payload: error
//     })
//   } finally {
//     dispatch(waitingState('FORGOT_PASSWORD', false))
//   }
// }

// export const resetPassword = body => async dispatch => {
//   try {
//     dispatch(waitingState('RESET_PASSWORD', true))
//     const { data } = await apiFetch(`/api/v1/auth/password/reset`, {
//       method: 'POST',
//       headers: new global.Headers({ 'Content-Type': 'application/json' }),
//       body: JSON.stringify(body),
//       credentials: 'include'
//     })
//     return dispatch({
//       type: 'USER_PASSWORD_CHANGE',
//       payload: data
//     })
//   } catch (error) {
//     return dispatch({
//       type: 'FETCH_ERROR',
//       payload: error
//     })
//   } finally {
//     dispatch(waitingState('RESET_PASSWORD', false))
//   }
// }

// export const updatePassword = (current, newPassword) => async dispatch => {
//   try {
//     dispatch(waitingState('USER_PASSWORD', true))
//     const { data } = await apiFetch(`/api/v1/auth/password/change`, {
//       method: 'POST',
//       headers: new global.Headers({ 'Content-Type': 'application/json' }),
//       body: JSON.stringify({
//         current,
//         password: newPassword
//       }),
//       credentials: 'include'
//     })
//     return dispatch({
//       type: 'USER_PASSWORD_CHANGE',
//       payload: data
//     })
//   } catch (error) {
//     return dispatch({
//       type: 'FETCH_ERROR',
//       payload: error
//     })
//   } finally {
//     dispatch(waitingState('USER_PASSWORD', false))
//   }
// }

// export const acceptInvite = body => async dispatch => {
//   try {
//     dispatch(waitingState('USER_CLIENT', true))
//     await apiFetch(`/api/v1/auth/invite`, {
//       method: 'POST',
//       body: JSON.stringify(body),
//       headers: new global.Headers({ 'Content-Type': 'application/json' }),
//       credentials: 'include'
//     })
//   } catch (error) {
//     return dispatch({
//       type: 'FETCH_ERROR',
//       payload: error
//     })
//   } finally {
//     dispatch(waitingState('USER_CLIENT', false))
//   }
// }

// export const changeClient = client => async dispatch => {
//   try {
//     dispatch(waitingState('USER_CLIENT', true))
//     await apiFetch(`/api/v1/auth/client`, {
//       method: 'PUT',
//       body: JSON.stringify({
//         guid: client.guid
//       }),
//       headers: new global.Headers({ 'Content-Type': 'application/json' }),
//       credentials: 'include'
//     })
//   } catch (error) {
//     return dispatch({
//       type: 'FETCH_ERROR',
//       payload: error
//     })
//   } finally {
//     dispatch(waitingState('USER_CLIENT', false))
//   }
// }
