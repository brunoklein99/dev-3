import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { white } from 'material-ui/styles/colors'
import TextField from 'material-ui/TextField'
import { ToastContainer, toast } from 'react-toastify'

import Loader from 'react-loader'

import ThemeDefault from '../../../theme-default'
import loginService from '../../../services/loginService'

import { LOGIN } from '../../../config/routes'

export default class Login extends Component {
  state = {
    didCheckAuthentication: false,

    notify: false,
    notifyMessage: '',
    notifySucess: false,

    username: '',
    password: '',
    isAuthenticated: false,
    referrer: null,
  }

  componentDidMount() {
    const referrer = this.props.location.pathname
    if (referrer !== LOGIN) {
      this.setState({ referrer })
    }
    this.checkAuthentication()
  }

  checkAuthentication() {
    loginService.checkAuthentication()
      .then(() => this.setState({ didCheckAuthentication: true, isAuthenticated: true }))
      .catch(() => this.setState({ didCheckAuthentication: true }))
  }

  showNotification(sucess, message) {
    this.setState({
      notify: true,
      notifySucess: sucess,
      notifyMessage: message,
    })
  }

  handleLoginSubmit = (e) => {
    e.preventDefault()
    const { username, password } = this.state
    loginService.login({ username, password })
      .then(() => this.setState({ isAuthenticated: true }))
      .catch(() => {
        this.showNotification(false, 'E-mail e/ou senha inválidos.')
      })
  }

  handleChangeUsername = (event) => {
    this.setState({
      notify: false,
      username: event.target.value,
    })
  }

  handleChangePassword = (event) => {
    this.setState({
      notify: false,
      password: event.target.value,
    })
  }

  renderLoginForm() {
    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto',
      },
      paper: {
        padding: 20,
        overflow: 'auto',
      },
      loginBtn: {
        float: 'right',
      },
      btn: {
        background: '#4f81e9',
        color: white,
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13,
      },
      btnFacebook: {
        background: '#4f81e9',
      },
      btnGoogle: {
        background: '#e14441',
      },
      btnSpan: {
        marginLeft: 5,
      },
    }

    if (this.state.notify) {
      if (this.state.notifySucess) {
        toast.success(this.state.notifyMessage)
      } else {
        toast.error(this.state.notifyMessage)
      }
    }

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <ToastContainer />
          <div style={styles.loginContainer}>
            <Paper style={styles.paper}>
              <form onSubmit={this.handleLoginSubmit}>
                <TextField
                  autoFocus
                  hintText="Nome de usuário"
                  floatingLabelText="Nome de usuário"
                  fullWidth
                  onChange={this.handleChangeUsername}
                  value={this.state.username}
                />
                <TextField
                  hintText="Senha"
                  floatingLabelText="Senha"
                  fullWidth
                  type="password"
                  onChange={this.handleChangePassword}
                  value={this.state.password}
                />
                <RaisedButton
                  label="Login"
                  primary
                  style={styles.loginBtn}
                  type="submit"
                />
              </form>
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

  renderFormOrRedirect() {
    const { isAuthenticated } = this.state
    if (isAuthenticated) {
      const referrer = this.state.referrer || '/'
      return (
        <Redirect to={referrer} />
      )
    }

    return this.renderLoginForm()
  }

  render() {
    const { didCheckAuthentication } = this.state

    return (
      <Loader loaded={didCheckAuthentication}>
        {this.renderFormOrRedirect()}
      </Loader>
    )
  }
}

Login.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}
