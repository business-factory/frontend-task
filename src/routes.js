import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/app'
import MainPage from './components/main-page'
import CoverPage from './components/cover-page'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CoverPage} />
    <Route path="home" component={CoverPage} />
    <Route path="main" component={MainPage} />
  </Route>
)
