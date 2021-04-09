import { combineReducers } from 'redux'

const authenticated = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_FAILURE':
      return false
    case 'FETCH_ERROR':
      const { payload } = action
      if (payload.code !== 'Unauthorized') {
        return state
      }

      return false
    case 'LOGIN_SUCCESS':
      return true
    case 'SIGNING_OUT_SUCCESS':
      return false
    case 'CLIENT_ACTIVE_CHANGE':
      if (action.payload !== undefined) {
        return true
      }

      return false
    case 'USER_LOGOUT':
      return false
    default:
      return state
  }
}

const error = (state = false, action) => {
  switch (action.type) {
    case 'AUTHENTICATION_SUCCESS':
      return false
    case 'AUTHENTICATION_FAILURE':
      return true
    default:
      return state
  }
}

const selectedId = (state = null, action) => {
  switch (action.type) {
    case 'RESEARCHER_SELECTED':
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  authenticated,
  error,
  selectedId
})
