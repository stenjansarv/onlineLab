import { combineReducers } from 'redux'

const list = (state = [], action) => {
  switch (action.type) {
    case 'EDUCATIONS_LIST':
      return action.payload
    case 'EDUCATION_ADDED':
      return state.concat(action.payload)
    case 'EDUCATION_REMOVED':
      return state.filter(education => education.id !== action.payload)
    default:
      return state
  }
}

export default combineReducers({
  list
})
