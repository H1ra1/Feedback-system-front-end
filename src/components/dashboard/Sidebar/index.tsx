import React from 'react';
import Link from 'next/link';
import { MdDashboard } from 'react-icons/md';
import styles from './styles.module.scss';

function Sidebar() {
    return (
        <div className={`${styles["main-sidebar"]} default-shadow flex flex-column flex-align-center`}>
            <div className={styles['main-sidebar__logo']}>
                <img src="" alt="" />
                <span></span>
            </div>

            <div className={`${styles['main-sidebar__items']} flex flex-column flex-align-center`}>
                <Link href="/dashboard" className={`${styles['sidebar-item']} ${styles['sidebar-item--active']}`}><MdDashboard /></Link>
                <Link href="/dashboard" className={`${styles['sidebar-item']}`}><MdDashboard /></Link>
                <Link href="/dashboard" className={`${styles['sidebar-item']}`}><MdDashboard /></Link>
            </div>
        </div>
    );
}

export default Sidebar;
