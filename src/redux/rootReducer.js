import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import publications from './reducers/publications.reducer'
import employments from './reducers/employments.reducer'
import educations from './reducers/educations.reducer'
import auth from './reducers/auth.reducer'
import waiting from './reducers/waiting.reducer'
import user from './reducers/user.reducer'

export default (history) => combineReducers({
  router: connectRouter(history),
  publications,
  employments,
  educations,
  auth,
  user,
  waiting
})
