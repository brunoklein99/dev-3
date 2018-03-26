import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';

import PageBase from '../common/PageBase';

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
        .then(({ name, username, admin }) => this.setState({ didLoad: true, name, username, admin }))
    } else {
      this.setState({ didLoad: true })
    }
  }

  handleSaveClick = (e) => {
    e.preventDefault()

    const { name, username, admin, password } = this.state

    const data = {
      admin,
      name,
      password,
      username,
    }

    const { id } = this.props.match.params
    if (id) {
      accountService.update(id, data)
        .then(() => console.log('### did update'))
    } else {
      accountService.create(data)
        .then(() => console.log('### did create'))
    }
  }

  handleInputChange = (property, e, value) => {
    this.setState({ [property]: value})
  }

  render() {
    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5
      }
    };

    let form = null

    if (this.state.didLoad) {
      form = (
        <form>
          <TextField
            hintText="Nome"
            floatingLabelText="Nome"
            fullWidth={true}
            onChange={this.handleInputChange.bind(this, 'name')}
            value={this.state.name}
          />

          <div>
            <TextField
              hintText="Nome de usuário"
              floatingLabelText="Nome de usuário"
              onChange={this.handleInputChange.bind(this, 'username')}
              value={this.state.username}
            />
          </div>

          <div>
            <TextField
              hintText="Senha"
              floatingLabelText="Senha"
              type="password"
              onChange={this.handleInputChange.bind(this, 'password')}
              value={this.state.password}
            />
          </div>

          <div style={styles.toggleDiv}>
            <Toggle
              label="Administrador"
              labelStyle={styles.toggleLabel}
              onToggle={this.handleInputChange.bind(this, 'admin')}
              toggled={this.state.admin}
            />
          </div>

          <div style={styles.buttons}>
            <RaisedButton
              onClick={this.handleSaveClick}
              label="Salvar"
              style={styles.saveButton}
              type="submit"
              primary={true}
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
    );
  }
}

export default AccountForm;
