import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import PrivateArea from './components/PrivateArea'
import PublicArea from './components/PublicArea'

import loginService from './services/loginService'

export default () => (
  <BrowserRouter>
    <div>
      <Route path="/" render={props => (loginService.isAuthenticated() ? (<PrivateArea {...props} />) : (<PublicArea {...props} />))}/>
    </div>
  </BrowserRouter>
);
