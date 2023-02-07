'use client'

import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

interface Tabs {
    tab_id: string
    tab_name: string
}

interface TabsItems {
    tab_id: string
    tab_title?: string
    tab_subtitle?: string
    tab_content: JSX.Element
}

interface TabsHolderProps {
    tabs: Tabs[]
    tabs_items: TabsItems[]
    active_tab?: string
}

function TabsHolder( props: TabsHolderProps ) {
    const [ activeTab, setActiveTab ] = useState< string  >( '' );

    function tabsHandle( tab_name: string ) {
        setActiveTab( tab_name );
    }

    useEffect( () => {
        const START_TAB = props.active_tab && props.active_tab != '' ? props.active_tab : props.tabs[0].tab_id;

        setActiveTab( START_TAB );
    }, [] );

    return (
        <div className={`${styles['tabs-holder']} default-shadow`}>
            <div className={`${styles['tabs-holder__header_tabs']} flex`}>
                { props.tabs && props.tabs.map( ( tab ) => (
                    <div 
                        className={`${styles['tab-header-item']} ${ activeTab == tab.tab_id && styles['tab-header-item--active'] } flex flex-align-center`}
                        onClick={ () => tabsHandle( tab.tab_id ) }
                    >
                        {tab.tab_name}
                    </div>
                ) ) }
            </div>

            <div className={`${styles['tabs-holder__tabs_items_holder']}`}>
                { props.tabs_items && props.tabs_items.map( ( tab_item ) => (
                    <div className={`${styles['tab-item']} ${ activeTab == tab_item.tab_id && styles['tab-item--active'] }`}>
                        <p className={`${styles['tab-item__title']}`}>{tab_item.tab_title}</p>
                        <span className={`${styles['tab-item__subtitle']}`}>{tab_item.tab_subtitle}</span>

                        <div className={`${styles['tab-item__content_holder']}`}>
                            {tab_item.tab_content}
                        </div>
                    </div>
                ) ) }
            </div>
        </div>
    );
}

export default TabsHolder;