import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { grey400 } from 'material-ui/styles/colors'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import PageBase from '../common/PageBase'
import activityService from '../../../../services/activityService'

const formataData = data => (`${data.substr(8, 2)}/${data.substr(5, 2)}/${data.substr(0, 4)}`)

class ActivityForm extends Component {
  state = {
    didLoad: false,

    notify: false,
    notifyMessage: '',
    notifySucess: false,

    name: '',
    description: '',
    trainer: '',
    users: false,
    beginDate: '',
    endDate: '',
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) {
      activityService.get(id)
        .then(({
          name, description, trainer, users, beginDate, endDate,
        }) => this.setState({
          didLoad: true,
          name,
          description,
          trainer: trainer.name,
          users,
          beginDate: formataData(beginDate),
          endDate: formataData(endDate),
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
      name, description, trainer, users, beginDate, endDate,
    } = this.state

    const data = {
      name,
      description,
      trainer,
      users,
      beginDate,
      endDate,
    }

    const { id } = this.props.match.params
    if (id) {
      activityService.update(id, data)
        .then(() => {
          this.showNotification(true, 'Atividade alterado com sucesso.')
        })
        .catch(() => {
          this.showNotification(false, 'Erro, por favor tente novamente.')
        })
    } else {
      activityService.create(data)
        .then(() => {
          this.showNotification(true, 'Atividade criado com sucesso.')
        })
        .catch(() => {
          this.showNotification(false, 'Erro, por favor tente novamente.')
        })
    }
  }

  handleInputChange = (property, value) => this.setState({ [property]: value })

  handleNameChange = (e, value) => this.handleInputChange('name', value)
  handleDescriptionChange = (e, value) => this.handleInputChange('description', value)
  handleTrainerChange = (e, value) => this.handleInputChange('trainer', value)
  handleUsersChange = (e, value) => this.handleInputChange('users', value)
  handleBeginDateChange = (e, value) => this.handleInputChange('beginDate', value)
  handleEndDateChange = (e, value) => this.handleInputChange('endDate', value)

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

          <div>
            <TextField
              hintText="Nome"
              floatingLabelText="Nome"
              onChange={this.handleNameChange}
              value={this.state.name}
            />
          </div>

          <div>
            <TextField
              hintText="Descrição"
              floatingLabelText="Descrição"
              type="text"
              onChange={this.handleDescriptionChange}
              value={this.state.description}
            />
          </div>

          <div >
            <TextField
              hintText="Treinador"
              floatingLabelText="Treinador"
              type="text"
              onChange={this.handleTrainerChange}
              value={this.state.trainer}
            />
          </div>

          <div >
            <TextField
              hintText="Usuários"
              floatingLabelText="Usuários"
              type="text"
              onChange={this.handleUsersChange}
              value={this.state.users}
            />
          </div>

          <div >
            <TextField
              hintText="Data Inicial"
              floatingLabelText="Data Inicial"
              type="text"
              onChange={this.handleBeginDateChange}
              value={this.state.beginDate}
            />
          </div>

          <div >
            <TextField
              hintText="Data Final"
              floatingLabelText="Data Final"
              type="text"
              onChange={this.handleEndDateChange}
              value={this.state.endDate}
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
        title="Atividade"
      >
        <div>
          <ToastContainer />
          {form}
        </div>
      </PageBase>
    )
  }
}

ActivityForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}

export default ActivityForm
