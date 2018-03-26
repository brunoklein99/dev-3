import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import App from './App'
import Dashboard from './pages/Dashboard'
import AccountList from './pages/AccountList'
import AccountForm from './pages/AccountForm'

import {
  DASHBOARD,
  ACCOUNT_LIST,
  ACCOUNT_FORM,
} from '../../config/routes'

export default class PrivateArea extends Component {
  render() {
    return (
      <div>
        <App>
          <Route exact path={DASHBOARD} component={Dashboard}/>
          <Route exact strict path={ACCOUNT_LIST} component={AccountList}/>
          <Route exact strict path={`${ACCOUNT_FORM}/:id?`} component={AccountForm}/>
        </App>
      </div>
    )
  }
}
