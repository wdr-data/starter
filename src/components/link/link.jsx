import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './link.module.css';

export const Link = ({ title, href, ...rest }) => {
  return (
    <a
      className={classNames(styles.link, styles.linkSingle)}
      href={href}
      rel="noopener noreferrer"
      target="_blank">
      <span>{title}</span> <span>|</span> <strong>mehr</strong>
    </a>
  )
};

Link.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
};


export const LinkList = ({ links, ...rest }) => {
  return (
    <ul className={styles.linkList}>
      {
        links.map(
          ({ title, href }) => <li>
            <a className={styles.link} href={href} rel="noopener noreferrer" target="_blank">
              <span>{title}</span> <span>|</span> <strong>mehr</strong>
            </a>
          </li>
        )
      }
    </ul>
  )
};

LinkList.propTypes = {
  links: {
    title: PropTypes.string,
    href: PropTypes.string,
  },
};

export default Link;
