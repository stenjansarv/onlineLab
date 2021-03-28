import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import './index.css' // TODO: Add this back once not using antd anymore 
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
