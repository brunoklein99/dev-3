import React from 'react'

import Assessment from 'material-ui/svg-icons/action/assessment'
import GridOn from 'material-ui/svg-icons/image/grid-on'
import Web from 'material-ui/svg-icons/av/web'

import {
  DASHBOARD,
  ACCOUNT_LIST,
  ACCOUNT_FORM,
  ACTIVITY_FORM,
  ACTIVITY_LIST,
  RESTRICTION_LIST,
  RESTRICTION_FORM,
} from '../routes'

export default [
  { text: 'Dashboard', icon: <Assessment />, link: DASHBOARD },
  { text: 'Usuários', icon: <GridOn />, link: ACCOUNT_LIST },
  { text: 'Criar usuário', icon: <Web />, link: ACCOUNT_FORM },
  { text: 'Atividades', icon: <GridOn />, link: ACTIVITY_LIST },
  { text: 'Criar atividade', icon: <Web />, link: ACTIVITY_FORM },
  { text: 'Restrições', icon: <GridOn />, link: RESTRICTION_LIST },
  { text: 'Criar restrições', icon: <Web />, link: RESTRICTION_FORM },
]
