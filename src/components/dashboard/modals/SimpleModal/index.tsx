'use client'

import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import DecreaseClose from '../../icons/DecreaseClose';

interface SimpleModalProps {
    open_modal: boolean
    title?: string
    icon?: JSX.Element
    callback: ( open: boolean ) => void
    children?: React.ReactNode
}

function SimpleModal( props: SimpleModalProps ) {
    const [ SHOW_MODAL, setSHOW_MODAL ] = useState< boolean >( false );

    useEffect( () => {
        setSHOW_MODAL( props.open_modal );
    }, [ props.open_modal ] );

    return (
        <>
            {SHOW_MODAL ?
            <div className={`${styles['simple-modal']} flex flex-align-center flex-justify-center`}>
                <div className={`${styles['simple-modal-box']} default-shadow`}>
                    <div 
                        className={`${styles['simple-modal-box--close-modal']} default-shadow flex flex-align-center flex-justify-center`}
                        onClick={ () => props.callback( false ) }
                    ><DecreaseClose /></div>

                    <div className={`${styles['simple-modal-box__title_holder']} flex flex-align-center flex-gap-10`}>
                        { props.icon }
                        <p>{ props.title }</p>
                    </div>
                    
                    <div className={`${styles['simple-modal-box__content_holder']}`}>
                        { props.children }
                    </div>
                </div>
            </div>
            : ''}
        </>
    )
}

export default SimpleModal;
