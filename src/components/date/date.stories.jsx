import React from 'react';
import { storiesOf } from '@storybook/react';
import DateFormat from './date.jsx';

storiesOf('Date', module)
    .add('default', () => (
        <DateFormat date={new Date()}/>
    ));