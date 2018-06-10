import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  FloatingActionButton,
} from 'material-ui'

import { ActionDeleteForever } from 'material-ui/svg-icons'
import { pink500 } from 'material-ui/styles/colors'

import PageBase from '../common/PageBase'
import activityService from '../../../../services/activityService'

const formataData = data => (`${data.substr(8, 2)}/${data.substr(5, 2)}/${data.substr(0, 4)}`)

const style = {
  label: {
    fontWeight: 'bold',
    width: '15%',
  },
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
}

class ActivityDetail extends Component {
  state = {
    didLoad: false,
    showDelete: false,
    name: '',
    description: '',
    trainer: '',
    users: [],
    beginDate: '',
    endDate: '',
  }

  componentDidMount() {
    const { id } = this.props.match.params
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
      }))
  }

  renderDeleteButton() {
    return (
      <div>
        <FloatingActionButton
          style={style.floatingActionButton}
          backgroundColor={pink500}
        >
          <ActionDeleteForever />
        </FloatingActionButton>
      </div>
    )
  }

  render() {
    let info = null

    const { users } = this.state
    const listUsers = users.map((user, i) => {
      let userText = ''
      if (i > 0) userText += ','
      userText += user.name
      return (`<span>${userText}</span>`)
    })

    let deleteButton = null
    if (this.state.showDelete) {
      deleteButton = this.renderDeleteButton()
    }

    if (this.state.didLoad) {
      console.log('this.state', this.state)
      info = (
        <Table
          selectable={false}
        >
          <TableBody
            displayRowCheckbox={false}
          >
            {/* Name */}
            <TableRow>
              <TableRowColumn style={style.label}>
                Nome:
              </TableRowColumn>
              <TableRowColumn>
                { this.state.name }
              </TableRowColumn>
            </TableRow>
            {/* Description */}
            <TableRow>
              <TableRowColumn style={style.label}>
                Descrição:
              </TableRowColumn>
              <TableRowColumn>
                { this.state.description }
              </TableRowColumn>
            </TableRow>
            {/* Trainer */}
            <TableRow>
              <TableRowColumn style={style.label}>
                Treinador:
              </TableRowColumn>
              <TableRowColumn>
                { this.state.trainer }
              </TableRowColumn>
            </TableRow>
            {/* Users */}
            <TableRow>
              <TableRowColumn style={style.label}>
                Usuários:
              </TableRowColumn>
              <TableRowColumn>
                { listUsers }
              </TableRowColumn>
            </TableRow>
            {/* Begin Date */}
            <TableRow>
              <TableRowColumn style={style.label}>
                Data Inicial:
              </TableRowColumn>
              <TableRowColumn>
                { this.state.beginDate }
              </TableRowColumn>
            </TableRow>
            {/* End Date */}
            <TableRow>
              <TableRowColumn style={style.label}>
                Data Final:
              </TableRowColumn>
              <TableRowColumn>
                { this.state.endDate }
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      )
    }

    return (

      <PageBase
        title="Atividade"
      >
        <div>
          {info}
        </div>
        { deleteButton }
      </PageBase>
    )
  }
}

ActivityDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
}

export default ActivityDetail
