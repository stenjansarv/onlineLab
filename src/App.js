import React from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Publications from './Pages/Publications'
import NotFound from './Pages/NotFound'

function App() {
  return (
    <Router>
      <div className="App" style={{overflow: 'hidden'}}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/publications" component={Publications} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App
