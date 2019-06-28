import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'class-names';

import styles from './logo.module.css';
import wdrLogo from '!svg-inline-loader!./logo_wdr.svg';

const Logo = ({
    className,
    onClick,
    ...props
}) => {
    return <div
        className={classNames(styles.logo, className)}
        onClick={onClick}
        {...props}
        dangerouslySetInnerHTML={{__html: wdrLogo}}/>;
};

Logo.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Logo;
