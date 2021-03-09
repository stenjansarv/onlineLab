import { combineReducers } from 'redux'

const list = (state = [], action) => {
  switch (action.type) {
    case 'EMPLOYMENTS_LIST':
      return action.payload
    case 'EMPLOYMENT_ADDED':
      return state.concat(action.payload)
    case 'EMPLOYMENT_REMOVED':
      return state.filter(employment => employment.id !== action.payload)
    default:
      return state
  }
}

export default combineReducers({
  list
})
