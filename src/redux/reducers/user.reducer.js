import { combineReducers } from 'redux'

const details = (state = {}, action) => {
  switch (action.type) {
    case 'USER':
      return action.payload
    case 'USER_LOGOUT':
      return {}
    default:
      return state
  }
}

export default combineReducers({
  details
})