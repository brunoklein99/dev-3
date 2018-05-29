import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentCreate from 'material-ui/svg-icons/content/create'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { pink500, grey200, grey500 } from 'material-ui/styles/colors'

import PageBase from '../common/PageBase'
import restrictionService from '../../../../services/restrictionService'

import { RESTRICTION_FORM } from '../../../../config/routes'

const styles = {
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  editButton: {
    fill: grey500,
  },
  columns: {
    id: {
      width: '10%',
    },
    name: {
      width: '30%',
    },
    activities: {
      width: '50%',
    },
    edit: {
      width: '10%',
    },
  },
}

class RestrictionList extends Component {
  state = {
    restrictions: [],
  }

  componentDidMount() {
    restrictionService.all()
      .then(data => this.setState({ restrictions: data }))
      .catch(err => console.log(err))
  }

  renderHeader() {
    return (
      <TableHeader>
        <TableRow>
          <TableHeaderColumn style={styles.columns.name}>Nome</TableHeaderColumn>
          <TableHeaderColumn style={styles.columns.activities.name}>Atividades</TableHeaderColumn>
          <TableHeaderColumn style={styles.columns.edit}>Editar</TableHeaderColumn>
        </TableRow>
      </TableHeader>
    )
  }

  renderBody() {
    const { restrictions } = this.state
    return (
      <TableBody>
        {restrictions.map(item => (
          <TableRow key={item.id}>
            <TableRowColumn style={styles.columns.name}>{item.name}</TableRowColumn>
            <TableRowColumn style={styles.columns.activities}>{item.activities.name}</TableRowColumn>
            <TableRowColumn style={styles.columns.edit}>
              <Link
                className="button"
                to={`${RESTRICTION_FORM}/${item.id}`}
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
          <Link to={RESTRICTION_FORM} >
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

export default RestrictionList
