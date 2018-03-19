import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import loginService from '../../services/loginService'

export default class PrivateArea extends Component {
  state = {
    logout: false,
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
