import React from 'react';
import { storiesOf } from '@storybook/react';
import Accordion from './accordion.jsx';

storiesOf('Accordion', module)
    .add('default', () => (
        <Accordion authors={[<a href="https://twitter.com/pen1710" target="_blank" rel="noopener noreferrer">Patricia Ennenbach</a>]
        } sources={
            <React.Fragment>
                <h3>Extern</h3>
                <p>Berechnung der Daten: <a href='https://www1.wdr.de/nachrichten/schwimmbaeder-foerdung-bund-100.html'>Schwimmbäderförderung im Bund</a></p>
                <p>Analyse: <a href='https://www1.wdr.de/nachrichten/schwimmbaeder-foerdung-bund-100.html'>Schwimmbäderförderung im Bund</a></p>
                <h3>Intern</h3>
                <a href='https://www1.wdr.de/nachrichten/schwimmbaeder-foerdung-bund-100.html'>Schwimmbäderförderung im Bund</a><br/>
                <a href='https://www1.wdr.de/nachrichten/schwimmbaeder-foerdung-bund-100.html'>Schwimmbäderförderung im Bund</a>
            </React.Fragment>
        } credits={
            <p>Unsplash: @mak_ip <a href='https://unsplash.com/photos/BfEnygJ9WQA'>hier</a></p>
        }
        hints={
            <React.Fragment>
                <h3>Analytics</h3>
                    <p>Diese Seite verwendet Webtrekk, um Daten über das Interaktions- und Nutzungsverhalten zu sammeln. Diese Daten werden auf Seiten des WDR ausschliesslich in anonymisierter Form gespeichert und ausgewertet.</p>
                <h3>Fehler melden</h3>
                    <p>Für Hinweise und die Meldung von Fehlern schreiben Sie uns an data@wdr.de.</p>
            </React.Fragment>
        }
        />
        ));
