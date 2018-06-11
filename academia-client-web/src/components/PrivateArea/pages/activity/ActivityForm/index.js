import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  RaisedButton,
  GridList,
  GridTile,
  SelectField,
  MenuItem,
} from 'material-ui'
import TextField from 'material-ui/TextField'
import { grey400 } from 'material-ui/styles/colors'
import { toast } from 'react-toastify'

import PageBase from '../../common/PageBase'
import activityService from '../../../../../services/activityService'
import accountService from '../../../../../services/accountService'

const formataDataForm = data => (`${data.substr(8, 2)}/${data.substr(5, 2)}/${data.substr(0, 4)}`)
const formataDataEnv = data => (`${data.substr(6, 4)}-${data.substr(3, 2)}-${data.substr(0, 2)}T00:00:00.000+0000`)

/*
  @TODO

  1) MASKS
      beginDate
      endDate

  2) Checkboxes Users
*/

class ActivityForm extends Component {
  state = {
    didLoad: false,

    notify: false,
    notifyMessage: '',
    notifySucess: false,
    activity: {
      name: '',
      description: '',
      trainer: null,
      users: [],
      beginDate: '',
      endDate: '',
    },
    trainers: [],
  }

  componentDidMount() {
    const accountPromise = accountService.all()

    let activityPromise
    const { id } = this.props.match.params
    if (id) {
      activityPromise = activityService.get(id)
    } else {
      activityPromise = Promise.resolve()
    }

    Promise.all([
      accountPromise,
      activityPromise,
    ])
      .then((data) => {
        const accounts = data[0].filter(user => user.type === 'TRAINER')
        const activity = data[1] || this.state.activity
        this.setState({
          trainers: accounts,
          activity: {
            ...activity,
            beginDate: formataDataForm(activity.beginDate),
            endDate: formataDataForm(activity.beginDate),
          },
          didLoad: true,
          notify: false,
        })
      })
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
      activity: {
        name,
        description,
        trainer,
        users,
        beginDate,
        endDate,
      },
    } = this.state

    let data = {
      name,
      description,
      trainer,
      users,
      beginDate,
      endDate,
    }

    const { id } = this.props.match.params
    if (id) {
      accountService.get(trainer)
        .then((dataAccount) => {
          data = {
            ...data,
            trainer: dataAccount,
            beginDate: formataDataEnv(beginDate),
            endDate: formataDataEnv(endDate),
          }
          activityService.update(id, data)
            .then(() => {
              this.showNotification(true, 'Atividade alterado com sucesso.')
            })
            .catch(() => {
              this.showNotification(false, 'Erro, por favor tente novamente.')
            })
        })
    } else {
      accountService.get(trainer)
        .then((dataAccount) => {
          data = {
            ...data,
            trainer: dataAccount,
            beginDate: formataDataEnv(beginDate),
            endDate: formataDataEnv(endDate),
          }
          activityService.create(data)
            .then(() => {
              this.showNotification(true, 'Atividade criado com sucesso.')
            })
            .catch(() => {
              this.showNotification(false, 'Erro, por favor tente novamente.')
            })
        })
    }
  }

  handleInputChange = (property, value) => (
    this.setState({
      activity: {
        ...this.state.activity,
        [property]: value,
      },
    })
  )

  handleNameChange = (e, value) => this.handleInputChange('name', value)
  handleDescriptionChange = (e, value) => this.handleInputChange('description', value)
  handleTrainerChange = (e, index, value) => this.handleInputChange('trainer', value)
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

    const { trainers } = this.state
    const listTrainer = trainers.map(trainer => (
      <MenuItem key={trainer.id} selected={(this.state.activity.trainer !== null && trainer.id === this.state.activity.trainer.id)} value={trainer.id} primaryText={trainer.name} />
    ))

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
          <GridList
            cols={3}
            padding={25}
            cellHeight={70}
          >
            <GridTile>
              <TextField
                hintText="Nome"
                floatingLabelText="Nome"
                fullWidth
                onChange={this.handleNameChange}
                value={this.state.activity.name}
              />
            </GridTile>
            <GridTile cols={2}>
              <TextField
                hintText="Descrição"
                floatingLabelText="Descrição"
                fullWidth
                type="text"
                onChange={this.handleDescriptionChange}
                value={this.state.activity.description}
              />
            </GridTile>
          </GridList>
          <GridList
            cols={3}
            padding={25}
            cellHeight={70}
          >
            <GridTile>
              <SelectField
                value={this.state.activity.trainer}
                onChange={this.handleTrainerChange}
              >
                { listTrainer }
              </SelectField>
            </GridTile>
            <GridTile>
              <TextField
                hintText="Data Inicial"
                floatingLabelText="Data Inicial"
                type="text"
                onChange={this.handleBeginDateChange}
                value={this.state.activity.beginDate}
              />
            </GridTile>
            <GridTile>
              <TextField
                hintText="Data Final"
                floatingLabelText="Data Final"
                type="text"
                onChange={this.handleEndDateChange}
                value={this.state.activity.endDate}
              />
            </GridTile>
          </GridList>
          <GridList
            cols={1}
            padding={25}
            cellHeight={70}
          >
            <TextField
              hintText="Usuários"
              floatingLabelText="Usuários"
              type="text"
              onChange={this.handleUsersChange}
              value={this.state.activity.users}
            />
          </GridList>
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
