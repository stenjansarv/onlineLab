import React from 'react'
import ReactDOM from 'react-dom'
// import './index.css' // TODO: Add this back once not using antd anymore
import 'antd/dist/antd.css'
import App from './App'

// Redux
import { Provider } from 'react-redux';
import configureStore, { history } from './redux/store';
import { ConnectedRouter } from 'connected-react-router/immutable'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
