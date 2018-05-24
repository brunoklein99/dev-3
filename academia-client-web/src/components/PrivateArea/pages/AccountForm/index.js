import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import { grey400 } from 'material-ui/styles/colors'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import PageBase from '../common/PageBase'
import accountService from '../../../../services/accountService'

class AccountForm extends Component {
  state = {
    didLoad: false,

    notify: false,
    notifyMessage: '',
    notifySucess: false,

    name: '',
    username: '',
    password: '',
    admin: false,
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) {
      accountService.get(id)
        .then(({ name, username, admin }) => this.setState({
          didLoad: true,
          name,
          username,
          admin,
          notify: false,
        }))
    } else {
      this.setState({
        didLoad: true,
        notify: false,
      })
    }
  }

  showNotification(sucess, message) {
    this.setState({
      notify: true,
      notifySucess: sucess,
      notifyMessage: message,
    })
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
        .then(() => {
          this.showNotification(true, 'Usuário alterado com sucesso.')
        })
        .catch(() => {
          this.showNotification(false, 'Erro, por favor tente novamente.')
        })
    } else {
      accountService.create(data)
        .then(() => {
          this.showNotification(true, 'Usuário criado com sucesso.')
        })
        .catch(() => {
          this.showNotification(false, 'Erro, por favor tente novamente.')
        })
    }
  }

  handleInputChange = (property, value) => this.setState({ [property]: value })

  handleNameChange = (e, value) => this.handleInputChange('name', value)
  handleUsernameChange = (e, value) => this.handleInputChange('username', value)
  handlePasswordChange = (e, value) => this.handleInputChange('password', value)
  handleAdminChange = (e, value) => this.handleInputChange('admin', value)

  render() {
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

    if (this.state.notify) {
      if (this.state.notifySucess) {
        toast.success(this.state.notifyMessage)
      } else {
        toast.error(this.state.notifyMessage)
      }
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
        <ToastContainer />
        {form}
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
