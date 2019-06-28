import React from 'react';
import PropTypes from 'prop-types';

import styles from './date.module.css';

const DateFormat = ({ date }) => {
    return <span className={styles.date}>{date.toLocaleDateString('de-DE', {year: 'numeric', month: 'long', day: 'numeric' })}</span>
};

DateFormat.propTypes = {
    date: PropTypes.instanceOf(Date),
};

export default DateFormat;