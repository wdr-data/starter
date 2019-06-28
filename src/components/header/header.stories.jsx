import React from 'react';
import { storiesOf } from '@storybook/react';

import { NoMargin } from '../../../.storybook/helpers.jsx';
import Header from './header';
import heroImage from './story-image.jpg';

storiesOf('Components / Header', module)
    .addDecorator(NoMargin)
    .add('without Hero', () => <Header />)
    .add('with Hero', () => <Header heroImage={heroImage} heroAlt="Hipster-Koch" heroCredit="Irina on Unsplash" />)