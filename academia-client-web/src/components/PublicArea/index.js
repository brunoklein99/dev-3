import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Login from './Login'

const RedirectToLogin = () => (
  <Redirect to="/login" />
)

export default ({ match }) => (
  <div>
    <h2>PublicArea</h2>
    <Route exact path="/" component={RedirectToLogin}></Route>
    <Route path={`${match.url}`} component={Login}/>
  </div>
)
