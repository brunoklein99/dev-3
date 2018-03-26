import React from 'react';

import Assessment from 'material-ui/svg-icons/action/assessment';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import Web from 'material-ui/svg-icons/av/web';

import {
  DASHBOARD,
  ACCOUNT_LIST,
  ACCOUNT_FORM,
} from '../routes'

export default [
  { text: 'Dashboard', icon: <Assessment/>, link: DASHBOARD },
  { text: 'Usuários', icon: <GridOn/>, link: ACCOUNT_LIST },
  { text: 'Criar usuário', icon: <Web/>, link: ACCOUNT_FORM },
]
