import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentCreate from 'material-ui/svg-icons/content/create'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentVisibility from 'material-ui/svg-icons/action/visibility'
import { pink500, grey200, grey500 } from 'material-ui/styles/colors'

import PageBase from '../../common/PageBase'
import activityService from '../../../../../services/activityService'

import { ACTIVITY_FORM, ACTIVITY_DETAIL } from '../../../../../config/routes'

const styles = {
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  detailButton: {
    fill: grey500,
  },
  editButton: {
    fill: grey500,
  },
  columns: {
    id: {
      width: '10%',
    },
    name: {
      width: '20%',
    },
    description: {
      width: '20%',
    },
    trainer: {
      width: '20%',
    },
    beginDate: {
      width: '15%',
    },
    endDate: {
      width: '15%',
    },
    detail: {
      width: '10%',
    },
    edit: {
      width: '10%',
    },
  },
}

const formataData = data => (`${data.substr(8, 2)}/${data.substr(5, 2)}/${data.substr(0, 4)}`)

class ActivityList extends Component {
  state = {
    activities: [],
  }

  componentDidMount() {
    activityService.all()
      .then(data => this.setState({ activities: data }))
      .catch(err => console.log(err))
  }

  renderHeader() {
    return (
      <TableHeader
        displaySelectAll={false}
        enableSelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn style={styles.columns.name}>Nome</TableHeaderColumn>
          <TableHeaderColumn style={styles.columns.description}>Descrição</TableHeaderColumn>
          <TableHeaderColumn style={styles.columns.trainer}>Treinador</TableHeaderColumn>
          <TableHeaderColumn style={styles.columns.beginDate}>Começo</TableHeaderColumn>
          <TableHeaderColumn style={styles.columns.endDate}>Final</TableHeaderColumn>
          <TableHeaderColumn style={styles.columns.edit}>Editar</TableHeaderColumn>
          <TableHeaderColumn style={styles.columns.detail}>Detalhar</TableHeaderColumn>
        </TableRow>
      </TableHeader>
    )
  }

  renderBody() {
    const { activities } = this.state
    return (
      <TableBody
        displayRowCheckbox={false}
      >
        {activities.map(item => (
          <TableRow key={item.id}>
            <TableRowColumn style={styles.columns.name}>{item.name}</TableRowColumn>
            <TableRowColumn style={styles.columns.description}>{item.description}</TableRowColumn>
            <TableRowColumn style={styles.columns.trainer}>{item.trainer.name}</TableRowColumn>
            <TableRowColumn style={styles.columns.beginDate}>{formataData(item.beginDate)}</TableRowColumn>
            <TableRowColumn style={styles.columns.endDate}>{formataData(item.endDate)}</TableRowColumn>
            <TableRowColumn style={styles.columns.edit}>
              <Link
                className="button"
                to={`${ACTIVITY_FORM}/${item.id}`}
              >
                <FloatingActionButton
                  zDepth={0}
                  mini
                  backgroundColor={grey200}
                  iconStyle={styles.editButton}
                >
                  <ContentCreate />
                </FloatingActionButton>
              </Link>
            </TableRowColumn>
            <TableRowColumn style={styles.columns.detail}>
              <Link
                className="button"
                to={`${ACTIVITY_DETAIL}/${item.id}`}
              >
                <FloatingActionButton
                  zDepth={0}
                  mini
                  backgroundColor={grey200}
                  iconStyle={styles.editButton}
                >
                  <ContentVisibility />
                </FloatingActionButton>
              </Link>
            </TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    )
  }

  render() {
    return (
      <PageBase
        title="Atiividades"
      >
        <div>
          <Link to={ACTIVITY_FORM} >
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

          <Table>
            {this.renderHeader()}
            {this.renderBody()}
          </Table>
        </div>
      </PageBase>
    )
  }
}

export default ActivityList
