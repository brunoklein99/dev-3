import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import accountService from '../../services/accountService'

import loginService from '../../services/loginService'

export default class PrivateArea extends Component {
  state = {
    logout: false,
  }

  componentDidMount() {
    accountService.all()
      .then(({ data }) => console.log('### then', data))
      .catch((err) => console.log('### catch', err))
  }

  logout = () => {
    loginService.logout()
    this.setState({ logout: true })
  }

  render() {
    const { logout } = this.state

    if (logout) {
      return (
        <Redirect to="/login" />
      )
    }

    return (
      <div>
        <h2>PrivateArea</h2>
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  }
}
