import React from 'react';
import { storiesOf } from '@storybook/react';
import { BackgroundDecorator, NoMargin } from '../../../.storybook/helpers.jsx'
import Logo from './logo.jsx';

storiesOf('Components / Logo', module)
    .addDecorator(BackgroundDecorator)
    .addDecorator(NoMargin)
    .add('default', () => (
        <Logo/>
    ));
