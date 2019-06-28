import React from 'react';
import { storiesOf } from '@storybook/react';
import { NoMargin } from '../../../.storybook/helpers.jsx'
import Footer from './footer.jsx';

storiesOf('Components / Footer', module)
    .addDecorator(NoMargin)
    .add('default', () => (
        <Footer/>
    ));