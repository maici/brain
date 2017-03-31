import React from 'react'
import App from 'components/App'
import { Router, Route, IndexRedirect, IndexRoute, browserHistory } from 'react-router'

const AppRouter = () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}>
      </Route>
    </Router>
  )
}

export default AppRouter
