import React from 'react';
import { storiesOf } from '@storybook/react';
import { NoMargin } from '../../../.storybook/helpers.jsx'

import Quote from './quote.jsx';

storiesOf('Quote', module)
    .addDecorator(NoMargin)
    .add('default', () => (
    <Quote author="Anonymus">To quote or not to quote. That is the question.</Quote>
));
