import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Login from './Login'

import {
  LOGIN,
} from '../../config/routes'

const RedirectToLogin = () => (
  <Redirect
    to={LOGIN}
  />
)

export default (props) => (
  <div>
    <Route exact path="/" component={RedirectToLogin}></Route>
    <Route path={`${props.match.url}`} component={Login}/>
  </div>
)
