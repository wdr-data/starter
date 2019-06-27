import React from 'react';
import { storiesOf } from '@storybook/react';
import OrdinalFrame from './semiotic_barChart.jsx';

storiesOf('Semiotic_barChart', module)
    .add('default', () => (
        <OrdinalFrame {...frameProps} />
));
