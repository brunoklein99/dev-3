import React from 'react'
import { Route } from 'react-router-dom'

import App from './App'
import Dashboard from './pages/Dashboard'
import AccountList from './pages/AccountList'
import AccountForm from './pages/AccountForm'
import ActivityList from './pages/ActivityList'
import ActivityForm from './pages/ActivityForm'
import RestrictionList from './pages/RestrictionList'
import RestrictionForm from './pages/RestrictionForm'

import {
  DASHBOARD,
  ACCOUNT_LIST,
  ACCOUNT_FORM,
  ACTIVITY_LIST,
  ACTIVITY_FORM,
  RESTRICTION_LIST,
  RESTRICTION_FORM,
} from '../../config/routes'

export default () => (
  <div>
    <App>
      <Route exact path={DASHBOARD} component={Dashboard} />
      <Route exact strict path={ACCOUNT_LIST} component={AccountList} />
      <Route exact strict path={`${ACCOUNT_FORM}/:id?`} component={AccountForm} />
      <Route exact strict path={ACTIVITY_LIST} component={ActivityList} />
      <Route exact strict path={`${ACTIVITY_FORM}/:id?`} component={ActivityForm} />
      <Route exact strict path={RESTRICTION_LIST} component={RestrictionList} />
      <Route exact strict path={`${RESTRICTION_FORM}/:id?`} component={RestrictionForm} />
    </App>
  </div>
)
