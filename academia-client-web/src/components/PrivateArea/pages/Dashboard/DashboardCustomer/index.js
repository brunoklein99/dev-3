import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import DirectionsRun from 'material-ui/svg-icons/maps/directions-run'
import NewReleases from 'material-ui/svg-icons/av/new-releases'
import { grey200, cyan600, white } from 'material-ui/styles/colors'
import { typography } from 'material-ui/styles'

import { format, isToday, isTodayOrAfter, sortByDate } from '../../../../../utils/date'

const styles = {
  subheader: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan600,
    color: white,
  },
  today: {
    backgroundColor: grey200,
  },
}

export default class DashboardCustomer extends Component {
  static propTypes = {
    data: PropTypes.shape({
      appointments: PropTypes.array.isRequired,
    }).isRequired,
  }

  renderNextAppointments(appointments) {
    const sortedAppointments = sortByDate(appointments, 'start')

    return (
      <Paper>
        <List>
          <Subheader style={styles.subheader}>Próximas aulas</Subheader>
          {sortedAppointments.map(appointment => (
            <div key={appointment.id} style={isToday(appointment.start) ? styles.today : {}}>
              <ListItem
                leftAvatar={<Avatar icon={<DirectionsRun />} />}
                primaryText={`${format(appointment.start)}: ${appointment.activity.name} (com ${appointment.trainer.name})`}
                secondaryText={appointment.activity.description}
                rightIcon={isToday(appointment.start) ? <NewReleases /> : null}
              />
              <Divider inset />
            </div>
          ))}
        </List>
      </Paper>
    )
  }

  render() {
    const { data } = this.props
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
          {this.renderNextAppointments(data.appointments.filter(a => isTodayOrAfter(a.start)))}
        </div>
      </div>
    )
  }
}
