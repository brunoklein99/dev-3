import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import App from './App'
import Dashboard from './Dashboard'
import TablePage from './TablePage'

import accountService from '../../services/accountService'

export default class PrivateArea extends Component {
  componentDidMount() {
    accountService.all()
      .then(({ data }) => console.log('### then', data))
      .catch((err) => console.log('### catch', err))
  }

  render() {
    return (
      <div>
        <App>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/table" component={TablePage}/>
        </App>
      </div>
    )
  }
}
