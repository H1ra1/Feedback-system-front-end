import React from 'react';
import LoggedUserHeader from '../LoggedUserHeader';
import styles from './styles.module.scss';
import utilsStyles from '../../../styles/utils.module.scss';

function Header() {
  return (
    <header className={`${styles.header} ${utilsStyles['flex']} ${utilsStyles['flex-justify-between']} ${utilsStyles['flex-align-center']}`}>
        <div className={`${styles.header__col}`}></div>
        <div className={`${styles.header__col}`}>
            <LoggedUserHeader />
        </div>
    </header>
  )
}

export default Header;