import React from 'react'

import Assessment from 'material-ui/svg-icons/action/assessment'
import GridOn from 'material-ui/svg-icons/image/grid-on'
import People from 'material-ui/svg-icons/social/people'
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
  {
    key: DASHBOARD,
    link: DASHBOARD,
    text: 'Dashboard',
    icon: <Assessment />,
  },
  {
    key: ACCOUNT_LIST,
    text: 'Usuários',
    icon: <People />,
    children: [
      {
        key: ACCOUNT_LIST,
        link: ACCOUNT_LIST,
        text: 'Listar Usuários',
        icon: <GridOn />,
      },
      {
        key: ACCOUNT_FORM,
        link: ACCOUNT_FORM,
        text: 'Criar usuário',
        icon: <Web />,
      },
    ],
  },
  {
    key: ACTIVITY_LIST,
    link: ACTIVITY_LIST,
    text: 'Atividades',
    icon: <GridOn />,
  },
  {
    key: ACTIVITY_FORM,
    link: ACTIVITY_FORM,
    text: 'Criar atividade',
    icon: <Web />,
  },
  {
    key: RESTRICTION_LIST,
    link: RESTRICTION_LIST,
    text: 'Restrições',
    icon: <GridOn />,
  },
  {
    key: RESTRICTION_FORM,
    link: RESTRICTION_FORM,
    text: 'Criar restrições',
    icon: <Web />,
  },
]
