import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import loginService from '../../../services/loginService'

export default class Login extends Component {
  state = {
    redirect: false,
  }

  login = () => {
    loginService.login()
    this.setState({ redirect: true })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirect } = this.state

    if (redirect) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <h2>Login</h2>
        <button onClick={this.login}>Login</button>
      </div>
    )
  }
}
