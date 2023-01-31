import React from 'react';
import LoggedUserHeader from '../LoggedUserHeader';
import styles from './styles.module.scss';

function Header() {
  return (
    <header className={`${styles.header} flex flex-justify-between flex-align-center`}>
        <div className={`${styles.header__col}`}></div>
        <div className={`${styles.header__col}`}>
            <LoggedUserHeader />
        </div>
    </header>
  )
}

export default Header;