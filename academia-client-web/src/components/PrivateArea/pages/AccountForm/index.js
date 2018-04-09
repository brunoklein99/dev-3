import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import { grey400 } from 'material-ui/styles/colors'

import PageBase from '../common/PageBase'

import accountService from '../../../../services/accountService'

class AccountForm extends Component {
  state = {
    didLoad: false,

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
        }))
    } else {
      this.setState({ didLoad: true })
    }
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
        // TODO mensagem de sucesso e falha
        .then(() => console.log('### did update'))
    } else {
      accountService.create(data)
        // TODO mensagem de sucesso e falha
        .then(() => console.log('### did create'))
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
