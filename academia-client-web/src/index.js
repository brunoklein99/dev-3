import React from 'react';
import { render } from 'react-dom';
import Routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

injectTapEventPlugin();

render(<Routes />, document.getElementById('root'));
