import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';

import styles from './logo.module.css';
import wdrLogo from '!svg-inline-loader!./logo_wdr.svg';

const Logo = ({
        className,
        href,
        title,
        ...props,
    }) => {
    return <a
            href={href || 'https://www1.wdr.de/index.html'}
            title={title || 'zur WDR Startseite'}
            target='_blank'
            rel='noopener'
            {...props}
        >
        <span
            className={classNames(styles.logo, className)}
            dangerouslySetInnerHTML={{__html: wdrLogo}}
        />
    </a>;
};

Logo.propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    title: PropTypes.string,
};

export default Logo;
