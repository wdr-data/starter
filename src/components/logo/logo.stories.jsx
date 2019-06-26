import React from 'react';
import { storiesOf } from '@storybook/react';
import Logo from './logo.jsx';

storiesOf('Logo', module)
    .add('default', () => (
        <Logo/>
    ))
    .add('white', () => (
        <Logo color='white'/>
    ));
