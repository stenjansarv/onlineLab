import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { get } from 'lodash'

import Amplify from 'aws-amplify'
import { Auth } from 'aws-amplify'
import './App.css'

import Home from './Pages/Home'
import About from './Pages/About'
import Publications from './Pages/Publications'
import NotFound from './Pages/NotFound'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Profile from './Pages/Profile'

import { continueSession } from './redux/actions/auth.actions'
import ResearcherHome from './Pages/ResearcherHome'
import LoadingScreen from './components/Loading'

const App = () => {
  const dispatch = useDispatch()

  const keepLoggedIn = (email) => dispatch(continueSession(email))

  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    })
  })

  useEffect(() => {
    checkCognitoUserSession()
  }, [])

  const checkCognitoUserSession = async () => {
    try {
      const authedUser = await Auth.currentAuthenticatedUser()

      if (authedUser) keepLoggedIn(authedUser.username)
    } catch (e) {
      console.error(e)
    }
  }

  const isAuthenticated = useSelector(state => state.auth.authenticated)
  const userOrcidId = useSelector(state => state.user.details.orcidID)
  const orcidId = useSelector(state => state.router.location.pathname)

  const isAuthenticating = useSelector(state => get(state.waiting.list, 'AUTHENTICATING', false))

  if (isAuthenticated && userOrcidId === orcidId.split('/')[1]) {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />

          {/* Authenticated Exclusive */}
          <Route path="/:orcidId/profile" component={Profile} />
          <Route path="/:orcidId/home" component={ResearcherHome} />
          <Route path="/:orcidId/about" component={About} />
          <Route path="/:orcidId/publications" component={Publications} />

          <Route component={NotFound} />
        </Switch>
      </div>
    )
  } else {
    if (!isAuthenticated && isAuthenticating) {
      return <LoadingScreen />
    }

    return (
      <div className="App" style={{overflow: 'hidden'}}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:orcidId/home" component={ResearcherHome} />
          <Route path="/:orcidId/about" component={About} />
          <Route path="/:orcidId/publications" component={Publications} />

          {/* UnAuthenticated Exclusive */}
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />

          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App
