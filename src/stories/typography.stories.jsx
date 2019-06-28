import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Styleguide / Typography', module)
    .add('default', () => (
        <React.Fragment>
            <h1>h1: Merriweather, 26px, font-weight 400</h1>
            <h2>h2: Open Sans, 20px, font-weight 300</h2>
            <h3>h3: Open Sans, 17.5px, font-weight 600</h3>
            <p>p: Open Sans, 17.5px, font-weight 300</p>
            <a>a: Color brand-link, text-decoration underline</a>
            <blockquote>class quote: Merriweather, 20px, font-weight 400</blockquote>
        </React.Fragment>
    ));
