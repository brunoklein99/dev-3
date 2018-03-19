import React from 'react';
import { Route } from 'react-router-dom';

import Login from './Login'

export default ({ match }) => (
  <div>
    <h2>PublicArea</h2>
    <Route path={`${match.url}`} component={Login}/>
  </div>
)
