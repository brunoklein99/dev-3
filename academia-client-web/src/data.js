import React from 'react';

import Assessment from 'material-ui/svg-icons/action/assessment';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import Web from 'material-ui/svg-icons/av/web';

const data = {
  menus: [
    { text: 'DashBoard', icon: <Assessment/>, link: '/dashboard' },
    { text: 'Form Page', icon: <Web/>, link: '/form' },
    { text: 'Table Page', icon: <GridOn/>, link: '/table' },
  ],
};

export default data;
