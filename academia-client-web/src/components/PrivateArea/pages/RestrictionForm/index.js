import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { grey400 } from 'material-ui/styles/colors'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import PageBase from '../common/PageBase'
import restrictionService from '../../../../services/restrictionService'
import activityService from '../../../../services/activityService'

class RestrictionForm extends Component {
  state = {
    didLoad: false,

    notify: false,
    notifyMessage: '',
    notifySucess: false,

    name: '',
    activities: '',
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) {
      restrictionService.get(id)
        .then(({
          name, activities,
        }) => this.setState({
          didLoad: true,
          name,
          activities,
          notify: false,
        }))
    } else {
      activityService.all()
        .then((data) => {
          this.setState({
            activities: data,
          })
        })
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
      name, activities,
    } = this.state

    const data = {
      name,
      activities,
    }

    const { id } = this.props.match.params
    if (id) {
      restrictionService.update(id, data)
        .then(() => {
          this.showNotification(true, 'Restrição alterado com sucesso.')
        })
        .catch(() => {
          this.showNotification(false, 'Erro, por favor tente novamente.')
        })
    } else {
      restrictionService.create(data)
        .then(() => {
          this.showNotification(true, 'Restrição criado com sucesso.')
        })
        .catch(() => {
          this.showNotification(false, 'Erro, por favor tente novamente.')
        })
    }
  }

  handleInputChange = (property, value) => this.setState({ [property]: value })

  handleNameChange = (e, value) => this.handleInputChange('name', value)
  handleActivitiesChange = (e, value) => this.handleInputChange('activities', value)

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
    let listActiviteis = null
    console.log(this.state.activities)
    if (this.state.activities) {
      listActiviteis = this.state.activities.map((item, i) => (
        <Checkbox
          key={i}
          value={item.id}
          label={item.name}
          name="activities"
        />
      ))
    }


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

          <div >
            { listActiviteis }
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
        title="Restrição"
      >
        <div>
          <ToastContainer />
          {form}
        </div>
      </PageBase>
    )
  }
}

RestrictionForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}

export default RestrictionForm
