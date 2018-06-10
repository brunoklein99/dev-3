import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  RaisedButton,
  TextField,
  Checkbox,
  GridList,
  GridTile,
} from 'material-ui'
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

    restriction: {
      name: '',
      activities: [],
    },
    activities: null,
  }

  componentDidMount() {
    const activityPromise = activityService.all()

    let restrictionPromise
    const { id } = this.props.match.params
    if (id) {
      restrictionPromise = restrictionService.get(id)
    } else {
      restrictionPromise = Promise.resolve()
    }

    Promise.all([
      activityPromise,
      restrictionPromise,
    ])
      .then((data) => {
        const activities = data[0]
        const restriction = data[1] || this.state.restriction
        this.setState({
          activities,
          restriction,
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

    const { restriction } = this.state

    const { id } = this.props.match.params
    if (id) {
      restrictionService.update(id, restriction)
        .then(() => this.showNotification(true, 'Restrição alterado com sucesso.'))
        .catch(() => this.showNotification(false, 'Erro, por favor tente novamente.'))
    } else {
      restrictionService.create(restriction)
        .then(() => this.showNotification(true, 'Restrição criado com sucesso.'))
        .catch(() => this.showNotification(false, 'Erro, por favor tente novamente.'))
    }
  }

  handleNameChange = (e, value) => {
    this.setState({
      restriction: {
        ...this.state.restriction,
        name: value,
      },
    })
  }

  handleActivitiesChange = (activity, checked) => {
    let newList
    if (checked) {
      newList = [...this.state.restriction.activities, activity]
    } else {
      newList = this.state.restriction.activities.filter(a => a !== activity)
    }

    this.setState({
      restriction: {
        ...this.state.restriction,
        activities: newList,
      },
    })
  }

  render() {
    const { restriction } = this.state

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
      listCheckbox: {
        marginTop: '20px',
      },
    }

    if (this.state.notify) {
      if (this.state.notifySucess) {
        toast.success(this.state.notifyMessage)
      } else {
        toast.error(this.state.notifyMessage)
      }
    }

    const isActivitySelected = activity => this.state.restriction.activities.includes(activity)

    let form = null
    let listActivities = null
    if (this.state.activities) {
      listActivities = this.state.activities.map(activity => (
        <Checkbox
          key={activity.id}
          label={activity.name}
          name="activities"
          onCheck={(e, checked) => this.handleActivitiesChange(activity, checked)}
          value={activity.id}
          checked={isActivitySelected(activity)}
        />
      ))
    }

    if (this.state.didLoad) {
      form = (
        <form>
          <GridList
            cols={2}
            padding={25}
            cellHeight={70}
          >
            <GridTile>
              <TextField
                hintText="Nome"
                floatingLabelText="Nome"
                onChange={this.handleNameChange}
                value={restriction.name}
                fullWidth
              />
            </GridTile>
            <GridTile style={styles.listCheckbox}>
              { listActivities }
            </GridTile>
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
