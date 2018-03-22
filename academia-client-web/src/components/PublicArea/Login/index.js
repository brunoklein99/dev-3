import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { white } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

import ThemeDefault from '../../../theme-default';
import loginService from '../../../services/loginService'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    redirect: false,
  }

  login = () => {
    const { username, password } = this.state
    loginService.login({ username, password })
      .then((data) => {
        this.setState({ redirect: true })
      })
      .catch((err) => {
        console.log('########## error', err)
      })
  }

  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value })
  }

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  render() {
    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto'
      },
      paper: {
        padding: 20,
        overflow: 'auto'
      },
      loginBtn: {
        float: 'right'
      },
      btn: {
        background: '#4f81e9',
        color: white,
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13
      },
      btnFacebook: {
        background: '#4f81e9'
      },
      btnGoogle: {
        background: '#e14441'
      },
      btnSpan: {
        marginLeft: 5
      },
    };

    const { redirect } = this.state
    if (redirect) {
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      return (
        <Redirect to={from} />
      )
    }

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>

            <Paper style={styles.paper}>

              <form>
                <TextField
                  hintText="Nome de usuário"
                  floatingLabelText="Nome de usuário"
                  fullWidth={true}
                  onChange={this.handleChangeUsername}
                  value={this.state.username}
                />
                <TextField
                  hintText="Senha"
                  floatingLabelText="Senha"
                  fullWidth={true}
                  type="password"
                  onChange={this.handleChangePassword}
                  value={this.state.password}
                />
                <RaisedButton
                  label="Login"
                  onClick={this.login}
                  primary={true}
                  style={styles.loginBtn}
                />
              </form>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
