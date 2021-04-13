import { combineReducers } from 'redux'

const details = (state = {}, action) => {
  switch (action.type) {
    case 'VIEWING_USER':
      return action.payload
    case 'CLEAR_VIEWING_USER':
      return {}
    default:
      return state
  }
}

const twitter = (state = {}, action) => {
  switch (action.type) {
    case 'TWITTER_FEED':
      return action.payload
    default:
      return state
  }
}



export default combineReducers({
  details,
  twitter
})