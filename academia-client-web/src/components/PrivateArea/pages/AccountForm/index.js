import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import { grey400 } from 'material-ui/styles/colors'
import { ToastContainer } from 'react-toastify'

import PageBase from '../common/PageBase'
import accountService from '../../../../services/accountService'
import notificationService, {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_ERROR,
} from '../../../../services/notificationService'

const styles = {
  toggleDiv: {
    maxWidth: 300,
    marginTop: 40,
    marginBottom: 5,
  },
  toggleLabel: {
    color: grey400,
    fontWeight: 100,
  },
  buttons: {
    marginTop: 30,
    float: 'right',
  },
  saveButton: {
    marginLeft: 5,
  },
}

class AccountForm extends Component {
  state = {
    didLoad: false,
    settings: null,
    account: null,
    notification: null,

    // notify: false,
    // notifyMessage: '',
    // notifySucess: false,

    // name: '',
    // username: '',
    // password: '',
    // admin: false,
  }

  componentDidMount() {
    const { id } = this.props.match.params

    let accountPromise
    if (id) {
      accountPromise = accountService.get(id)
    } else {
      accountPromise = Promise.resolve({})
    }

    const settingsPromise = accountService.settings()

    Promise.all([
      settingsPromise,
      accountPromise,
    ])
      .then((data) => {
        const [settings, account] = data
        this.setState({
          settings,
          account,
        })
        // .then(({ name, username, admin }) => this.setState({
        //   didLoad: true,
        //   name,
        //   username,
        //   admin,
        //   notify: false,
        // }))
      })
      .finally(() => {
        this.setState({
          didLoad: true,
        })
      })

    // if (id) {
    //   accountService.get(id)
    //     .then(({ name, username, admin }) => this.setState({
    //       didLoad: true,
    //       name,
    //       username,
    //       admin,
    //       notify: false,
    //     }))
    // } else {
    //   this.setState({
    //     didLoad: true,
    //     notify: false,
    //   })
    // }
  }

  handleSaveClick = (e) => {
    e.preventDefault()

    const {
      name, username, admin, password,
    } = this.state

    const data = {
      admin,
      name,
      password,
      username,
    }

    const { id } = this.props.match.params
    if (id) {
      accountService.update(id, data)
        .then(() => this.setState({ notification: { type: NOTIFICATION_SUCCESS, message: 'Usuário alterado com sucesso.' } }))
        .catch(() => this.setState({ notification: { type: NOTIFICATION_ERROR, message: 'Erro, por favor tente novamente.' } }))
    } else {
      accountService.create(data)
        .then(() => this.setState({ notification: { type: NOTIFICATION_SUCCESS, message: 'Usuário criado com sucesso.' } }))
        .catch(() => this.setState({ notification: { type: NOTIFICATION_ERROR, message: 'Erro, por favor tente novamente.' } }))
    }
  }

  handleInputChange = (property, value) => this.setState({ [property]: value })

  handleNameChange = (e, value) => this.handleInputChange('name', value)
  handleUsernameChange = (e, value) => this.handleInputChange('username', value)
  handlePasswordChange = (e, value) => this.handleInputChange('password', value)
  handleAdminChange = (e, value) => this.handleInputChange('admin', value)

  render() {
    if (this.state.notify) {
      notificationService.notify(this.state.notification)
    }

    let form = null
    if (this.state.didLoad) {
      form = (
        <form>
          <TextField
            hintText="Nome"
            floatingLabelText="Nome"
            fullWidth
            onChange={this.handleNameChange}
            value={this.state.name}
          />

          <div>
            <TextField
              hintText="Nome de usuário"
              floatingLabelText="Nome de usuário"
              onChange={this.handleUsernameChange}
              value={this.state.username}
            />
          </div>

          <div>
            <TextField
              hintText="Senha"
              floatingLabelText="Senha"
              type="password"
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
          </div>

          <div style={styles.toggleDiv}>
            <Toggle
              label="Administrador"
              labelStyle={styles.toggleLabel}
              onToggle={this.handleAdminChange}
              toggled={this.state.admin}
            />
          </div>

          <div style={styles.buttons}>
            <RaisedButton
              onClick={this.handleSaveClick}
              label="Salvar"
              style={styles.saveButton}
              type="submit"
              primary
            />
          </div>
        </form>
      )
    }

    return (
      <PageBase
        title="Usuário"
      >
        <div>
          <ToastContainer />
          {form}
        </div>
      </PageBase>
    )
  }
}

AccountForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}

export default AccountForm
