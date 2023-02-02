import React from 'react';
import styles from './styles.module.scss';

function DecreaseClose() {
  return (
    <div className={`${styles['decrease-close-icon']}`}>
        <span></span>
        <span></span>
    </div>
  )
}

export default DecreaseClose;