import React from 'react'
import App from 'components/App'
import { Router, Route, IndexRedirect, IndexRoute, browserHistory } from 'react-router'

const AppRouter = () => {
  return (
    <Router history={browserHistory}>
      <Route path='/'>
        <IndexRedirect to="app" />
        <Route path="app" component={App}>
        </Route>
      </Route>
    </Router>
  )
}

export default AppRouter
