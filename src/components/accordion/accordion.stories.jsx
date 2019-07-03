import React from 'react';
import { storiesOf } from '@storybook/react';
import Accordion from './accordion.jsx';

storiesOf('Accordion', module)
    .add('default', () => (
        <Accordion authors={
            <p>Penny<br/>Chrissi<br/>Marcus<br/>Christine</p>
        } sources={
            <React.Fragment>
                <a href='https://www1.wdr.de/nachrichten/schwimmbaeder-foerdung-bund-100.html'>Schwimmbäderförderung im Bund</a><br/>
                <a href='https://www1.wdr.de/nachrichten/schwimmbaeder-foerdung-bund-100.html'>Schwimmbäderförderung im Bund</a><br/>
                <a href='https://www1.wdr.de/nachrichten/schwimmbaeder-foerdung-bund-100.html'>Schwimmbäderförderung im Bund</a><br/>
                <a href='https://www1.wdr.de/nachrichten/schwimmbaeder-foerdung-bund-100.html'>Schwimmbäderförderung im Bund</a>
            </React.Fragment>
        } credits={
            <p>Unsplash: @mak_ip <a href='https://unsplash.com/photos/BfEnygJ9WQA'>hier</a></p>
        }/>
        ));
