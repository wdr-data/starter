import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './logo.css';
import wdrLogo from 'svg-inline-loader!./logo_wdr.svg';
console.log(wdrLogo);

const Logo = ({
    className,
    onClick,
    color,
    ...props
}) => {

    return <div
        className={classNames(
            styles.logo,
            {
                [styles.white]: color==='white',
            },
            className,
        )}
        onClick={onClick}
        {...props}
        dangerouslySetInnerHTML={{__html: wdrLogo}}/>;
};

Logo.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    color: PropTypes.string,
};

export default Logo;