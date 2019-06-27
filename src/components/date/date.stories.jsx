import React from 'react';
import { storiesOf } from '@storybook/react';
import Date from './date.jsx';

storiesOf('Date', module)
    .add('default', () => (
        <Date date={'26.06.2019'}/>
    ));