import { combineReducers } from 'redux'

const list = (state = {}, action) => {
  switch (action.type) {
    case 'WAITING':
      return {...state, [action.payload.key]: action.payload.state}
    default:
      return state
  }
}

export default combineReducers({
  list
})
