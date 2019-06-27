import React from 'react';
import { storiesOf } from '@storybook/react';
import SemioticBarChart from './semiotic_barChart.jsx';

storiesOf('Semiotic_barChart', module)
    .add('default', () => (
        <SemioticBarChart/>
));
