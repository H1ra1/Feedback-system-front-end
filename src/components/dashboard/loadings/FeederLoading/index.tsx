import React from 'react';
import styles from './styles.module.scss';

function FeederLoading() {
    return (
        <div className={`${styles['feeder-loading-container']} flex flex-align-center flex-justify-center`}>
            <div className={`${styles['feeder-loading']}`}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default FeederLoading;
