import { configure, addDecorator } from '@storybook/react';
import '../src/css/colors.css';
import '../src/css/defaults.css';
import '../src/css/typography.css';
import { AtomDecorator } from './helpers.jsx';

const req = require.context('../src', true, /\.stories\.jsx?$/);

addDecorator(AtomDecorator);

function loadStories() {
    req.keys().forEach(filename => req(filename));
  }

configure(loadStories, module);
