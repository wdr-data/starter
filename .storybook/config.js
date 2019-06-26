import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import '../src/css/colors.css';

const req = require.context('../src/components', true, /\.stories\.jsx?$/);

const BackgroundDecorator = (story) => (
  <div style={{backgroundColor: 'var(--storybook-background)', height: '100vh'}}>
    {story()}
  </div>
);

addDecorator(BackgroundDecorator);

function loadStories() {
    req.keys().forEach(filename => req(filename));
  }

configure(loadStories, module);