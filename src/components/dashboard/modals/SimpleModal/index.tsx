'use client'

import React, { useState } from 'react';
import styles from './styles.module.scss';
import { MdAirlineSeatLegroomReduced } from 'react-icons/md';
import DecreaseClose from '../../icons/DecreaseClose';

interface SimpleModalProps {
    children?: React.ReactNode
}

function SimpleModal( props: SimpleModalProps ) {
    const [ showModal, setShowModal ] = useState< boolean >( true );

    return (
        <>
            {showModal ?
            <div className={`${styles['simple-modal']} flex flex-align-center flex-justify-center`}>
                <div className={`${styles['simple-modal-box']} default-shadow`}>
                    <div 
                        className={`${styles['simple-modal-box--close-modal']} default-shadow flex flex-align-center flex-justify-center`}
                        onClick={ () => setShowModal( false ) }
                    ><DecreaseClose /></div>

                    <div className={`${styles['simple-modal-box__title_holder']} flex flex-align-center flex-gap-10`}>
                        <MdAirlineSeatLegroomReduced />
                        <p>Título do modal</p>
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
