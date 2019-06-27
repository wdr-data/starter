import React from 'react';
import PropTypes from 'prop-types';

import styles from './date.css';

const DateComponent = ({ date }) => {

    return <span className={styles.date}>{date}</span>
};

DateComponent.propTypes = {
    date: PropTypes.string,
};

export default DateComponent;