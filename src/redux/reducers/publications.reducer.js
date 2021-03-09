import { combineReducers } from 'redux'

const list = (state = [], action) => {
  switch (action.type) {
    case 'PUBLICATIONS_LIST':
      return action.payload
    case 'PUBLICATION_ADDED':
      return state.concat(action.payload)
    case 'PUBLICATION_REMOVED':
      return state.filter(publication => publication.id !== action.payload)
    default:
      return state
  }
}

export default combineReducers({
  list
})
