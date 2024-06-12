import React from 'react';
import styles from './Icon.module.css';

const Icon = ({ iconName, width = 24, height = 24 }) => {
  return (
    <div
      className={`${styles.sprite} ${styles[`bg-${iconName}`]}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></div>
  );
};

export default Icon;
