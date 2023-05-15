'use client'

import { useSession } from 'next-auth/react';
import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from './styles.module.scss';

function LoggedUserHeader() {
    const { data: session, status } = useSession();

    function handleClick() {
        console.log( session?.user.data.email );
    }

    return (
        <div className={`${styles['logged-user']}`}>
            <div 
            className={`${styles['logged-user__holder']} flex flex-align-center`}
            onClick={handleClick}
            >
                <div className={`${styles['logged-user-photo-holder']} flex flex-align-center flex-justify-center`}>
                    <p>{ session?.user.data.acronym }</p>
                </div>
                <div className={styles['logged-user-info']}>
                    <p>{ session?.user.data.username }</p>
                    <span>{  session?.user.data.email }</span>
                </div>

                <MdKeyboardArrowDown />
            </div>
        </div>
    )
}

export default LoggedUserHeader;