import React from 'react';

import styles from './footer.module.css';

const Footer = () => {

    return <footer className={styles.footer}>
            <nav className={styles.links}>
                <a href='https://www1.wdr.de/hilfe/index.html' target='_blank' rel='noopener'>Hilfe</a>
                <a href='https://www1.wdr.de/impressum/index.html' target='_blank' rel='noopener'>Impressum</a>
                <a href='https://www1.wdr.de/hilfe/datenschutz102.html' target='_blank' rel='noopener'>Datenschutz</a>
                <a href='https://www1.wdr.de/kontakt/index.html' target='_blank' rel='noopener'>Kontakt</a>
                <a>Bildrechte</a>
            </nav>
            <a href='https://www1.wdr.de/copyright/index.html' target='_blank' rel='noopener' className={styles.copyrightLink}>© WDR {(new Date().getFullYear())}</a>
        </footer>
};

export default Footer;