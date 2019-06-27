import React from 'react';
import styles from './helpers.css';

export const BackgroundDecorator = (story) => (
  <div className={styles.backgroundDecorator}>
    {story()}
  </div>
);

export const AtomDecorator = (story) => (
  <div className={styles.atomDecorator}>
    {story()}
  </div>
)

export const NoMargin = (story) => (
  <div className={styles.noMargin}>
    {story()}
  </div>
);


