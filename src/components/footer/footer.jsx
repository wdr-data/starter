import React from 'react';

import styles from './footer.css';

const Footer = () => {

    return <div className={styles.footer}>
            <div className={styles.links}>
                <a href={'https://knowbody.github.io/react-router-docs/api/Link.html'} target="_blank">Hilfe</a>
                <a>Impressum</a>
                <a>Datenschutz</a>
                <a>Kontakt</a>
                <a>Bildrechte</a>
            </div>
            <div className={styles.copyright}>
                <a href={'https://www1.wdr.de/copyright/index.html'} className={styles.copyrightLink}>© WDR {(new Date().getFullYear())}</a>
            </div>
        </div>
};

export default Footer;