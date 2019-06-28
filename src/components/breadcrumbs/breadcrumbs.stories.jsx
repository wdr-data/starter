import React from 'react';
import { storiesOf } from '@storybook/react';
import Breadcrumbs from './breadcrumbs.jsx';

storiesOf('Components / Breadcrumbs', module).add('default', () => (
    <Breadcrumbs>
        <a>WDR</a>
        <a>Nachrichten</a>
        <a>Landespolitik</a>
        <a>aktuelle Seite</a>
    </Breadcrumbs>
))
