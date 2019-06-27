import { configure, addDecorator } from '@storybook/react';
import '../src/css/colors.css';
import { AtomDecorator } from './helpers.jsx';

const req = require.context('../src/components', true, /\.stories\.jsx?$/);

addDecorator(AtomDecorator);

function loadStories() {
    req.keys().forEach(filename => req(filename));
  }

configure(loadStories, module);
