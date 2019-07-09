import React from 'react';
import PropTypes from 'prop-types';

import styles from './breadcrumbs.module.css';

const Breadcrumbs = ({ children }) => {

    return <div className={styles.breadcrumbs}>
            {children}
        </div>
};

Breadcrumbs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

export default Breadcrumbs;
