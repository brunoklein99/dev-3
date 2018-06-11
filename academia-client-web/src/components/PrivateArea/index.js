import React from 'react'
import { Route } from 'react-router-dom'

import App from './App'
import Dashboard from './pages/Dashboard'
import AccountList from './pages/AccountList'
import AccountForm from './pages/AccountForm'
import ActivityList from './pages/ActivityList'
import ActivityForm from './pages/ActivityForm'
import ActivityDetail from './pages/ActivityDetail'
import RestrictionList from './pages/RestrictionList'
import RestrictionForm from './pages/RestrictionForm'

import {
  DASHBOARD,
  ACCOUNT_LIST,
  ACCOUNT_FORM,
  ACTIVITY_LIST,
  ACTIVITY_FORM,
  ACTIVITY_DETAIL,
  RESTRICTION_LIST,
  RESTRICTION_FORM,
} from '../../config/routes'

/* eslint-disable react/prop-types */
export default ({ location }) => (
  <div>
    <App>
      <Route exact path={DASHBOARD} component={Dashboard} key={`${DASHBOARD}-${location.pathname}`} />
      <Route exact strict path={ACCOUNT_LIST} component={AccountList} key={`${ACCOUNT_LIST}-${location.pathname}`} />
      <Route exact strict path={`${ACCOUNT_FORM}/:id?`} component={AccountForm} key={`${ACCOUNT_FORM}-${location.pathname}`} />
      <Route exact strict path={ACTIVITY_LIST} component={ActivityList} key={`${ACTIVITY_LIST}-${location.pathname}`} />
      <Route exact strict path={`${ACTIVITY_FORM}/:id?`} component={ActivityForm} key={`${ACTIVITY_FORM}-${location.pathname}`} />
      <Route exact strict path={`${ACTIVITY_DETAIL}/:id?`} component={ActivityDetail} key={`${ACTIVITY_DETAIL}-${location.pathname}`} />
      <Route exact strict path={RESTRICTION_LIST} component={RestrictionList} key={`${RESTRICTION_LIST}-${location.pathname}`} />
      <Route exact strict path={`${RESTRICTION_FORM}/:id?`} component={RestrictionForm} key={`${RESTRICTION_FORM}-${location.pathname}`} />
    </App>
  </div>
)
