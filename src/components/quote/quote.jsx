import React from 'react';
import PropTypes from 'prop-types';

import styles from './quote.module.css';

const Quote = ({
    quote,
    quoteAuthor,
  }) => {
    return (
        <div className={styles.quoteWrapper}>
            <blockquote className={styles.quote}>
                {quote}
            </blockquote>
            <p className={styles.quoteAuthor}>
                {quoteAuthor}
            </p>
        </div>
    )
};

Quote.propTypes = {
    quote: PropTypes.string,
    quoteAuthor: PropTypes.string,
};

export default Quote;