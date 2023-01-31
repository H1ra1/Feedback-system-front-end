'use client'

import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from './styles.module.scss';

function LoggedUserHeader() {
    function handleClick() {
        console.log( 'clicou fio' );
    }

    return (
        <div className={`${styles['logged-user']}`}>
            <div 
            className={`${styles['logged-user__holder']} flex flex-align-center`}
            onClick={handleClick}
            >
                <div className={styles['logged-user-photo-holder']}></div>
                <div className={styles['logged-user-info']}>
                    <p>Paulo Cunha</p>
                    <span>paulocunha@ihubinc.com.br</span>
                </div>

                <MdKeyboardArrowDown />
            </div>
        </div>
    )
}

export default LoggedUserHeader;