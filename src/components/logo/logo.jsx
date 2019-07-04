import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';

import styles from './logo.module.css';
import wdrLogo from '!svg-inline-loader!./logo_wdr.svg';

const Logo = ({
        className,
        ...props,
    }) => {
    return <a href={'https://www1.wdr.de/index.html'} target='_blank' rel='noopener' title='zur WDR Startseite' aria-label='zur WDR Startseite'>
        <div
            className={classNames(styles.logo, className)}
            dangerouslySetInnerHTML={{__html: wdrLogo}}
            {...props}
        />
    </a>;
};

Logo.propTypes = {
    className: PropTypes.string,
};

export default Logo;
