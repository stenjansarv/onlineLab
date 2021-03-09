import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Amplify from 'aws-amplify'
import { Auth } from 'aws-amplify'
import './App.css'

import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Publications from './Pages/Publications'
import NotFound from './Pages/NotFound'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import SignOut from './Pages/SignOut'
import Profile from './Pages/Profile'

import { continueSession } from './redux/actions/auth.actions'

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
      // await Auth.currentSession()
      const authedUser = await Auth.currentAuthenticatedUser()

      console.log(authedUser)
      if (authedUser) keepLoggedIn(authedUser.username)
    } catch (e) {
      // console.error(e)
    }
  }

  const isAuthenticated = useSelector(state => state.auth.authenticated)
  const root = useSelector(state => state)
  
  console.log(root)

  if (isAuthenticated) {
    return (
      <div className="App" style={{overflow: 'hidden'}}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:orcidId/about" component={About} />
          <Route path="/:orcidId/contact" component={Contact} />
          <Route path="/:orcidId/publications" component={Publications} />

          {/* Authenticated Exclusive */}
          <Route path="/:orcidId/profile" component={Profile} />
          <Route path="/signout" component={SignOut} />

          {/* Redirections */}
          {/* <Route path="/signup" component={SignUp}><Redirect to="/profile" /> : <Profile /></Route>
          <Route path="/signin" component={SignIn}><Redirect to="/profile" /> : <Profile /></Route> */}

          <Route component={NotFound} />
        </Switch>
      </div>
    )
  } else {
    return (
      <div className="App" style={{overflow: 'hidden'}}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:orcidId/about" component={About} />
          <Route path="/:orcidId/contact" component={Contact} />
          <Route path="/:orcidId/publications" component={Publications} />

          {/* UnAuthenticated Exclusive */}
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signout" component={SignOut} />

          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App
