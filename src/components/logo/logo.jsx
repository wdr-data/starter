import React from 'react';

import styles from './logo.module.css';
import wdrLogo from '!svg-inline-loader!./logo_wdr.svg';

const Logo = () => {
    return <a href={'https://www1.wdr.de/index.html'} target='_blank' rel='noopener' title='zur WDR Startseite' aria-label='zur WDR Startseite'>
        <div
            className={styles.logo}
            dangerouslySetInnerHTML={{__html: wdrLogo}}
        />
    </a>;
};

export default Logo;
