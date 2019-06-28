import React from 'react';
import { storiesOf } from '@storybook/react';
import DWChart from 'react-datawrapper-chart';

storiesOf('Datawrapper', module)
    .add('default', () => (
        <DWChart title="Chart" src="//datawrapper.dwcdn.net/rjRUb/7/" />
));