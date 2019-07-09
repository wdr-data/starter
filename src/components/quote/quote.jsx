import React from "react";
import PropTypes from "prop-types";

import styles from "./quote.module.css";

const Quote = ({ children, author }) => {
  return (
    <blockquote className={styles.wrapper}>
      <p className={styles.quote}>{children}</p>
      <cite className={styles.author}>{author}</cite>
    </blockquote>
  );
};

Quote.propTypes = {
  children: PropTypes.string,
  author: PropTypes.node
};

export default Quote;
