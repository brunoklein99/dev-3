import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import { grey400 } from 'material-ui/styles/colors'

import PageBase from '../../common/PageBase'
import accountService from '../../../../../services/accountService'
import notificationService from '../../../../../services/notificationService'
import { ACCOUNT_FORM } from '../../../../../config/routes'

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
    redirect: false,

    settings: {},
    account: {
      name: '',
      username: '',
      password: '',
      type: null,
    },
    passwordUpdateDto: {
      password: '',
      passwordConfirmation: '',
    },
  }

  componentDidMount() {
    const id = this.getRouteId()

    const accountPromise = id ? accountService.get(id) : Promise.resolve(this.state.account)
    const settingsPromise = accountService.settings()

    Promise.all([
      settingsPromise,
      accountPromise,
    ])
      .then((data) => {
        const [settings, account] = data
        this.setState({
          settings,
          account: {
            ...account,
            type: id ? account.type : settings.accountType[0],
          },
          didLoad: true,
        })
      })
      .catch(() => {
        notificationService.notifyError('Erro ao carregar, tente novamente')
      })
  }

  getRouteId() {
    return this.props.match.params.id
  }

  handleSaveAccountClick = (e) => {
    e.preventDefault()

    const { account } = this.state

    const id = this.getRouteId()
    if (id) {
      accountService.update(id, account)
        .then(() => notificationService.notifySuccess('Salvo com sucesso'))
        .catch(() => notificationService.notifyError('Erro ao salvar, tente novamente'))
    } else {
      accountService.create(account)
        .then((data) => {
          notificationService.notifySuccess('Salvo com sucesso')
          this.setState({
            account: data,
            redirect: true,
          })
        })
        .catch(() => notificationService.notifyError('Erro ao salvar, tente novamente'))
    }
  }

  handleSavePasswordClick = (e) => {
    e.preventDefault()

    const { passwordUpdateDto } = this.state

    const id = this.getRouteId()
    accountService.updatePassword(id, passwordUpdateDto)
      .then(() => notificationService.notifySuccess('Senha alterada com sucesso'))
      .catch(() => notificationService.notifyError('Erro ao salvar, tente novamente'))
  }

  // account form
  handleAccountInput = (property, value) => this.setState({
    account: {
      ...this.state.account,
      [property]: value,
    },
  })
  handleNameChange = (e, value) => this.handleAccountInput('name', value)
  handleUsernameChange = (e, value) => this.handleAccountInput('username', value)
  handlePasswordChange = (e, value) => this.handleAccountInput('password', value)
  handleAccountTypeChange = (e, key, value) => this.handleAccountInput('type', value)

  // account form
  handlePasswordUpdateInput = (property, value) => this.setState({
    passwordUpdateDto: {
      ...this.state.passwordUpdateDto,
      [property]: value,
    },
  })
  handlePasswordUpdateChange = (e, value) => this.handlePasswordUpdateInput('password', value)
  handlePasswordConfirmationUpdateChange = (e, value) => this.handlePasswordUpdateInput('passwordConfirmation', value)

  render() {
    const {
      account,
      didLoad,
      passwordUpdateDto,
      redirect,
      settings,
    } = this.state

    if (redirect) {
      return (
        <Redirect to={`${ACCOUNT_FORM}/${this.state.account.id}`} />
      )
    }

    const id = this.getRouteId()

    let accountForm = null
    if (didLoad) {
      accountForm = (
        <form>
          <TextField
            hintText="Nome"
            floatingLabelText="Nome"
            fullWidth
            onChange={this.handleNameChange}
            value={account.name}
          />

          <div>
            <TextField
              disabled={!!id}
              hintText="Nome de usuário"
              floatingLabelText="Nome de usuário"
              onChange={this.handleUsernameChange}
              value={account.username}
            />
          </div>

          {!id && (
            <div>
              <TextField
                hintText="Senha"
                floatingLabelText="Senha"
                type="password"
                onChange={this.handlePasswordChange}
                value={account.password}
              />
            </div>
          )}

          <SelectField
            floatingLabelText="Tipo de conta"
            value={account.type}
            onChange={this.handleAccountTypeChange}
          >
            {settings.accountType.map(t => (<MenuItem
              key={t}
              value={t}
              primaryText={accountService.translateAccountType(t)}
            />))}
          </SelectField>

          <div style={styles.buttons}>
            <RaisedButton
              onClick={this.handleSaveAccountClick}
              label="Salvar"
              style={styles.saveButton}
              type="submit"
              primary
            />
          </div>
        </form>
      )
    }

    let passwordForm = null
    if (id) {
      passwordForm = (
        <form>
          <div>
            <TextField
              hintText="Senha"
              floatingLabelText="Senha"
              type="password"
              onChange={this.handlePasswordUpdateChange}
              value={passwordUpdateDto.password}
            />
          </div>

          <div>
            <TextField
              hintText="Confirmação de Senha"
              floatingLabelText="Confirmação de Senha"
              type="password"
              onChange={this.handlePasswordConfirmationUpdateChange}
              value={passwordUpdateDto.passwordConfirmation}
            />
          </div>

          <div style={styles.buttons}>
            <RaisedButton
              onClick={this.handleSavePasswordClick}
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
          {accountForm}
          {passwordForm}
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
