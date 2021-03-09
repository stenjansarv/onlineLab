import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import createRootReducer from './rootReducer'

export const history = createBrowserHistory()

const finalCreateStore = compose(applyMiddleware(thunk, routerMiddleware(history)))(createStore)

const rootReducer = createRootReducer(history)

export default initialState => finalCreateStore(rootReducer, initialState)