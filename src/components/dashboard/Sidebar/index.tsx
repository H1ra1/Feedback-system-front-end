'use client'

import React from 'react';
import Link from 'next/link';
import { MdDashboard, MdGroupWork, MdViewInAr } from 'react-icons/md';
import styles from './styles.module.scss';
import { usePathname } from 'next/navigation';

function Sidebar() {
    const PATH_NAME = usePathname();
    
    return (
        <div className={`${styles["main-sidebar"]} default-shadow flex flex-column flex-align-center`}>
            <div className={styles['main-sidebar__logo']}>
                <span></span>
            </div>

            <div className={`${styles['main-sidebar__items']} flex flex-column flex-align-center`}>
                <Link href="/dashboard" className={`${styles['sidebar-item']} ${PATH_NAME == '/dashboard' ? styles['sidebar-item--active'] : ''}`}><MdDashboard /></Link>
                <Link href="/dashboard" className={`${styles['sidebar-item']}`}><MdGroupWork /></Link>
                <Link href="/dashboard/users" className={`${styles['sidebar-item']} ${PATH_NAME == '/dashboard/users' ? styles['sidebar-item--active'] : ''}`}><MdViewInAr /></Link>
            </div>
        </div>
    );
}

export default Sidebar;
