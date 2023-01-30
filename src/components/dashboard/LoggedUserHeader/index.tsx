import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from './styles.module.scss';
import utilsStyles from '../../../styles/utils.module.scss';

function LoggedUserHeader() {
  return (
    <div className={`${styles['logged-user']}`}>
        <div className={`${styles['logged-user__holder']} ${utilsStyles['flex']} ${utilsStyles['flex-align-center']}`}>
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